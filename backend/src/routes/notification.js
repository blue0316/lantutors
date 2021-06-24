/**
 * Raw Queries: `StudentNotification`
 * Endpoint: `/api/notifications`
 * Additional CRUD-specific endpoint/handlers for the `StudentNotifications` assoc.
 *
 * These additional endpoints, namely, `PUT, DELETE`, currently do not have a
 * frontend counterpart, but can be used as helper tests for the frontend,
 * and can be adjusted should the spec require it in future feature implementations.
 *
 * @note Not attached to any validators or controllers
 * @see models.studentnotifications
 * @file defines notificationsApi
 * @since 24/06/2021
 */

import {
  getAllStudentsByEmail,
  getAllStudentsByTutor,
} from '../helpers/index';

export function notificationsApi(db, router) {
  /**
   * GET route for returning all Notification-Student-Tutor associations
   * @method SELECT * FROM notificationstudents
   */
  router.get('/notifications', async (req, res) => {
    const { students } = await db.StudentNotification.findAll(
      {}
    ).then((results) => ({
      students: results.map((result) => result),
    }));

    const result = [
      ...students
        .reduce((r, { title, tutorName, message, studentName }) => {
          r.has(title) ||
            r.set(title, {
              title,
              tutorName,
              message,
              recipients: [],
            });

          r.get(title).recipients.push({ studentName });

          return r;
        }, new Map())
        .values(),
    ];
    res.json(result);
  });

  /**
   * POST route for creating Notification-Student-Tutor records
   * @note an issuance of the same notification may be necessary for all students
   */
  router.post('/notifications', async function (req, res) {
    const tutor = await req.body.tutor;
    const notification = await req.body.notification;
    /**
     * Array of all registered students
     */
    const currentStudents = await getAllStudentsByEmail();
    /**
     * Array of all registered students assigned to this tutor
     * as default recipients of any notification from this tutor
     */
    const defaultRecipients = await getAllStudentsByTutor(tutor);

    const notificationsArr = notification.split(' ');

    let recipients = [];
    // for every word in the notification
    for (const mention in notificationsArr) {
      const iterator = notificationsArr[mention];
      // if the word starts with `@`
      if (iterator.startsWith('@')) {
        const foundEmail = iterator.split(/@(.+)/)[1];
        // if the substring after the first `@` matches with a registered student's email
        if (currentStudents.students.includes(foundEmail)) {
          recipients.push(foundEmail);
        }
      }
    }

    for (const name in defaultRecipients) {
      const iterator = defaultRecipients[name];
      const student = db.Student.findOne({
        where: {
          username: iterator,
        },
      });
      if (student) {
        recipients.push(student.email);
      }
    }

    /**
     * Add sequelize code to create a Notification-Student-Tutor record via req.body,
     * return the result to the user with res.json
     */
    db.StudentNotification.create({
      tutor: tutor,
      title: req.body.title,
      message: notification,
      student: req.body.student,
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * GET route for returning all Notification-Student-Tutor record issued by one Tutor
   * via Notification-Student-Tutor association
   * @method SELECT * FROM studentnotifications WHERE tutor = <tutor>
   */
  router.get('/notifications/:tutor', async function (req, res) {
    /**
     * Add sequelize code to find all Notification-Student-Tutor associations where
     * the tutor is equal to req.params.tutor.
     * return the result to the user with res.json
     */
    db.StudentNotification.findAll({
      where: {
        tutor: req.params.tutor,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * GET route for returning one Notification-Student-Tutor record by id
   * via TutorStudent association
   * @method SELECT * FROM studentnotifications WHERE id = <id>
   */
  router.get('/notifications/:id', async function (req, res) {
    /**
     * Add sequelize code to find all Notification-Student-Tutor associations where
     * the id is equal to req.params.id.
     * return the result to the user with res.json
     */
    db.StudentNotification.findAll({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * DELETE route for deleting Notification-Student-Tutor associations
   * @method SELECT * FROM studentnotifications WHERE id = <id>
   */
  router.delete('/notifications/:id', function (req, res) {
    /**
     * Add sequelize code to delete a Student-Notification record where
     * the studentnotification.id is equal to req.params.id.
     * return the result to the user with res.json
     */
    db.StudentNotification.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * PUT route for updating Notification-Student-Tutor records
   * @method SELECT * FROM studentnotifications WHERE id = <id>
   */
  router.put('/notifications/:id', function (req, res) {
    /**
     * Add sequelize code to update a Notification-Student-Tutor record via
     * the values of req.body, where
     * id is equal to req.body.id.
     * return the result to the user with res.json
     */
    db.StudentNotification.update(
      {
        tutor: req.body.tutor,
        title: req.body.title,
        message: req.body.message,
        student: req.body.student,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function (result) {
      res.json(result);
    });
  });
}
