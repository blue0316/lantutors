/**
 * Raw Queries: `TutorStudent`
 * Endpoint: `/api/notifications`
 * Additional CRUD-specific endpoint/handlers for the `TutorStudents` assoc.
 *
 * These additional endpoints, namely, `PUT, DELETE`, currently do not have a
 * frontend counterpart, but can be used as helper tests for the frontend,
 * and can be adjusted should the spec require it in future feature implementations.
 *
 * @note Not attached to any validators or controllers
 * @see models.tutorstudent
 * @file defines tutorStudentsApi
 * @since 24/06/2021
 */

const { QueryTypes } = require('sequelize');
import {
  getAllStudentsByEmail,
  getAllStudentsByTutor,
  getCommonStudentsByTutors,
} from '../helpers/index';

export function tutorStudentsApi(db, router) {
  /**
   * GET route for returning all Tutor-Student associations
   * @method SELECT * FROM tutorstudents
   */
  router.get('/commonstudents', async (req, res) => {
    /**
     * Check if there's a query in the url
     */
    const query = req.query.tutor;
    /**
     * If there is...
     */
    if (query) {
      /**
       * If there is only one...
       */
      let where = [];
      /**
       * Append it to a `where` array
       */
      if (typeof query === 'string' && query !== '') {
        where.push(query);
      }
      /**
       * If there are several, add the items to the `where` array
       */
      if (typeof query === 'object' && query.length > 0) {
        where.push(...query);
      }
      /**
       * Raw query the database to select and join ONLY the students
       * that have a TutorStudent record with ALL the tutors in `where`
       */
      const students = await getCommonStudentsByTutors(where);
      /**
       * Return a JSON api response in the spec'd format
       */
      res.status(200).json({
        students: students.map((student) => student.email),
      });

      /**
       * Else there are otherwise no queries in the url
       */
    } else {
      /**
       * Raw query the database to select ALL students by email
       */
      const students = await db.sequelize
        .query(
          `
        SELECT s.email from Students s
      `,
          {
            raw: true,
            type: QueryTypes.SELECT,
          }
        )
        .then((results) => results);
      /**
       * Return a JSON api response in the spec'd format
       */
      res.status(200).json({
        students: students.map((student) => student.email),
      });
    }
  });

  /**
   * POST route for creating Tutor-Student records
   * @note involves Student, duplicate post
   * @note CRUD for Student is bound to TutorStudent
   */
  router.post('/commonstudents', async function (req, res) {
    const tutor = await req.body.tutor;
    const incomingStudents = await req.body.students;
    const currentStudents = await getAllStudentsByEmail();
    /**
     * Add sequelize code to create a Student record via req.body,
     * return the result to the user with res.json
     */
    for (const incoming in incomingStudents) {
      const email = incomingStudents[incoming];
      if (
        currentStudents.students.includes(incomingStudents[incoming])
      ) {
        await db.TutorStudent.create({
          tutor: tutor,
          student: email,
        });
      } else {
        await db.Student.create({
          email: email,
        });

        await db.TutorStudent.create({
          tutor: tutor,
          student: student,
        });
      }
    }

    await db.Student.sync();
    await db.TutorStudent.sync();

    res.json({
      tutor: tutor,
      students: incomingStudents.map((student) => student),
    });
  });

  /**
   * GET route for returning Students under a specific Tutor
   * via TutorStudent association
   * @method SELECT * FROM tutorstudents WHERE tutor = <tutor>
   */
  router.get('/commonstudents/:tutor', async function (req, res) {
    /**
     * Add sequelize code to find all TutorStudent associations where
     * the tutorNAme is equal to req.params.tutorname.
     * return the result to the user with res.json
     */
    const result = await getAllStudentsByTutor(req.params.tutor);
    res.json(result);
  });

  /**
   * DELETE route for deleting TutorStudent associations
   * @note if you delete a student you must delete the TutorStudent first
   * @method SELECT * FROM tutorstudents WHERE id = <id>
   */
  router.delete('/commonstudents/:id', function (req, res) {
    /**
     * Add sequelize code to delete a TutorStudent record where
     * the TutorStudent.id is equal to req.params.id.
     * return the result to the user with res.json
     */
    db.TutorStudent.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * PUT route for updating Student records
   * @method SELECT * FROM tutorstudents WHERE id = <id>
   */
  router.put('/commonstudents/:id', function (req, res) {
    /**
     * Add sequelize code to update a TutorStudent record via
     * the values of req.body, where
     * id is equal to req.body.id.
     * return the result to the user with res.json
     */
    db.TutorStudent.update(
      {
        tutor: req.body.email,
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
