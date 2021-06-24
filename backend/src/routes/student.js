/**
 * Raw Queries: `Student`
 * Endpoint: `/api/students`
 * Additional CRUD-specific endpoint/handlers for the `Student` class
 *
 * These additional endpoints, namely, `PUT, DELETE`, currently do not have a 
 * frontend counterpart, but can be used as helper tests for the frontend, 
 * and can be adjusted should the spec require it in future feature implementations.
 *
 * @note Not attached to any validators or controllers
 * @see models.student
 * @file defines studentsApi
 * @since 24/06/2021
 */

import {
  getAllStudentsByEmail,
} from '../helpers/index';

export function studentsApi(db, router) {
  /**
   * GET route for returning all Student records
   * @method SELECT * FROM students
   */
  router.get('/students', async (req, res) => {
    const results = await getAllStudentsByEmail();
    res.json(results);
  });

  /**
   * POST route for creating Student records
   * @method SELECT * FROM students WHERE username = <username>
   */
  router.post('/students', async function (req, res) {
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
          email: email,
        });
      } else {
        await db.Student.create({
          email: email,
        });

        await db.TutorStudent.create({
          tutor: tutor,
          email: email,
        });
      }
    }

    await db.Student.sync();

    res.json({
      tutor: tutor,
      students: incomingStudents.map((student) => student),
    });
  });

  /**
   * GET route for returning one Student record
   * @method SELECT * FROM students WHERE email = <email>
   */
  router.get('/students/:email', async (req, res) => {
    /**
     * Add sequelize code to find a Student record where
     * the Student.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Student.findOne({
      where: {
        email: req.params.email,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * DELETE route for deleting Student records
   * @method SELECT * FROM students WHERE email = <email>
   */
  router.delete('/students/:email', function (req, res) {
    /**
     * Add sequelize code to delete a Student record where
     * the Student.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Student.destroy({
      where: {
        email: req.params.email,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * PUT route for updating Student records
   * @method SELECT * FROM students WHERE username = <username>
   */
  router.put('/students', function (req, res) {
    /**
     * Add sequelize code to update a Student record via
     * the values of req.body, where
     * username is equal to req.body.username.
     * return the result to the user with res.json
     */
    db.Student.update(
      {
        email: req.body.email,
        suspended: req.body.suspended,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    ).then(function (result) {
      res.json(result);
    });
  });
}
