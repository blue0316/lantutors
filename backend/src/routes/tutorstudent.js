import {
  getAllStudentsByEmail,
  getAllStudentsByTutorName,
} from '../helpers/index';

export function tutorStudentsApi(db, router) {
  /**
   * GET route for returning all Tutor-Student associations
   * @method SELECT * FROM tutorstudents
   */
  router.get('/commonstudents', async (req, res) => {
    const { students } = await db.TutorStudent.findAll({}).then(
      (results) => ({
        students: results.map((result) => result),
      })
    );

    const result = [
      ...students
        .reduce((r, { tutorName, id, studentName }) => {
          r.has(tutorName) ||
            r.set(tutorName, {
              tutorName,
              students: [],
            });

          r.get(tutorName).students.push({ id, studentName });

          return r;
        }, new Map())
        .values(),
    ];
    res.json(result);
  });

  /**
   * POST route for creating Tutor-Student records
   * @note involves Student, duplicate post
   * @note CRUD for Student is bound to TutorStudent
   */
  router.post('/commonstudents', async function (req, res) {
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
        await db.Student.create({
          email: incomingStudents[incoming],
          username: alias,
        });

        await db.TutorStudent.create({
          tutorName: tutor,
          studentName: alias,
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
   * @method SELECT * FROM tutorstudents WHERE tutorName = <tutorname>
   */
  router.get('/commonstudents/:tutorname', async function (req, res) {
    /**
     * Add sequelize code to find all TutorStudent associations where
     * the tutorNAme is equal to req.params.tutorname.
     * return the result to the user with res.json
     */
    const result = await getAllStudentsByTutorName(
      req.params.tutorname
    );
    res.json(result);
  });

  /**
   * DELETE route for deleting TutorStudent associations
   * @note if you delete a student you must delete the TutorStudent first
   * @method SELECT * FROM students WHERE username = <username>
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
  router.put('/commonstudents', function (req, res) {
    /**
     * Add sequelize code to update a TutorStudent record via
     * the values of req.body, where
     * id is equal to req.body.id.
     * return the result to the user with res.json
     */
    db.TutorStudent.update(
      {
        tutorName: req.body.email,
        studentName: req.body.suspended,
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
