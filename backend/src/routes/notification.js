import {
  getAllStudentsByEmail,
  getAllStudentsByTutorName,
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
    /**
     * Add sequelize code to create a Notification-Student-Tutor record via req.body,
     * return the result to the user with res.json
     */
    db.StudentNotification.create({
      tutorName: req.body.tutorName,
      title: req.body.title,
      message: req.body.message,
      studentName: req.body.studentName,
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * GET route for returning all Notification-Student-Tutor record issued by one Tutor
   * via Notification-Student-Tutor association
   * @method SELECT * FROM studentnotifications WHERE tutorName = <tutorname>
   */
  router.get('/notifications/:tutorName', async function (req, res) {
    /**
     * Add sequelize code to find all Notification-Student-Tutor associations where
     * the tutorNAme is equal to req.params.tutorname.
     * return the result to the user with res.json
     */
    db.StudentNotification.findAll({
      where: {
        tutorName: req.params.tutorName,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * GET route for returning one Notification-Student-Tutor record by id
   * via TutorStudent association
   * @method SELECT * FROM tutorstudents WHERE id = <id>
   */
  router.get('/notifications/:id', async function (req, res) {
    /**
     * Add sequelize code to find all Notification-Student-Tutor associations where
     * the tutorNAme is equal to req.params.tutorname.
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
   * @method SELECT * FROM students WHERE id = <id>
   */
  router.delete('/notifications/:id', function (req, res) {
    /**
     * Add sequelize code to delete a TutorStudent record where
     * the TutorStudent.id is equal to req.params.id.
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
  router.put('/notifications', function (req, res) {
    /**
     * Add sequelize code to update a Notification-Student-Tutor record via
     * the values of req.body, where
     * id is equal to req.body.id.
     * return the result to the user with res.json
     */
    db.StudentNotification.update(
      {
        tutorName: req.body.tutorName,
        title: req.body.title,
        message: req.body.message,
        studentName: req.body.studentName,
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
