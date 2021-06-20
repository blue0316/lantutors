import {
  getAllStudentsByEmail,
  getAllStudentsByTutorName,
} from '../helpers/index';

export function tutorsApi(db, router) {
  /**
   * GET route for returning all Tutor records
   * @method SELECT * FROM tutors
   */
  router.get('/tutors', async (req, res) => {
    db.Tutor.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  /**
   * POST route for creating Tutor records
   * @method SELECT * FROM students WHERE username = <username>
   */
  router.post('/tutors', function (req, res) {
    /**
     * Add sequelize code to create a Student record via req.body,
     * return the result to the user with res.json
     */
    db.Tutor.create({
      email: req.body.email,
      password: req.body.password,
    }).then(function (result) {
      res.json(result);
    });

    // const { students } = await getAllStudentsByTutorName(tutor);

    // res.json({
    //   tutor: tutor,
    //   students: incomingStudents.map((student) => student),
    // });
  });

  /**
   * GET route for returning one Tutor record
   * @method SELECT * FROM tutors WHERE username = <username>
   */
  router.get('/tutors/:username', async (req, res) => {
    /**
     * Add sequelize code to find a Student record where
     * the Tutor.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Tutor.findOne({
      where: {
        username: req.params.username,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * DELETE route for deleting Tutor records
   * @method SELECT * FROM tutors WHERE username = <username>
   */
  router.delete('/tutors/:username', function (req, res) {
    /**
     * Add sequelize code to delete a Tutor record where
     * the Tutor.username is equal to req.params.username.
     * return the result to the user with res.json
     */
    db.Tutor.destroy({
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
  router.put('/tutors', function (req, res) {
    /**
     * Add sequelize code to update a Student record via
     * the values of req.body, where
     * username is equal to req.body.username.
     * return the result to the user with res.json
     */
    db.Tutor.update(
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
