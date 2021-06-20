import {
  getAllStudentsByEmail,
  getAllStudentsByTutorName,
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
    const tutor = await req.body.tutor.split('@')[0];
    const incomingStudents = await req.body.students;
    const currentStudents = await getAllStudentsByEmail();
    /**
     * Add sequelize code to create a Student record via req.body,
     * return the result to the user with res.json
     */
    for (const incoming in incomingStudents) {
      console.log('test', incoming);
      const alias = incomingStudents[incoming].split('@')[0]; // temp
      if (
        currentStudents.students.includes(incomingStudents[incoming])
      ) {
        await db.TutorStudent.create({
          tutorName: tutor,
          studentName: alias,
        });
      } else {
        // await db.TutorStudent.sync();
        await db.Student.create({
          email: incomingStudents[incoming],
          username: alias,
        });
        // await db.Student.sync();
        await db.TutorStudent.create({
          tutorName: tutor,
          studentName: alias,
        });
        // await db.TutorStudent.sync();
      }
    }

    await db.Student.sync();

    // const { students } = await getAllStudentsByTutorName(tutor);

    res.json({
      tutor: tutor,
      students: incomingStudents.map((student) => student),
    });
  });

  /**
   * GET route for returning one Student record
   * @method SELECT * FROM students WHERE username = <username>
   */
  router.get('/students/:username', async (req, res) => {
    /**
     * Add sequelize code to find a Student record where
     * the Student.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Student.findOne({
      where: {
        username: req.params.username,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * DELETE route for deleting Student records
   * @method SELECT * FROM students WHERE username = <username>
   */
  router.delete('/students/:username', function (req, res) {
    /**
     * Add sequelize code to delete a Student record where
     * the Student.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Student.destroy({
      where: {
        username: req.params.username,
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
          username: req.body.username,
        },
      }
    ).then(function (result) {
      res.json(result);
    });
  });
}
