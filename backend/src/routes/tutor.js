/**
 * Raw Queries: `Tutor`
 * Endpoint: `/api/tutors`
 * Additional CRUD-specific endpoint/handlers for the `Tutor` class
 *
 * These additional endpoints, namely, `PUT, DELETE`, currently do not have a
 * frontend counterpart, but can be used as helper tests for the frontend,
 * and can be adjusted should the spec require it in future feature implementations.
 *
 * @note Not attached to any validators or controllers
 * @see models.tutor
 * @file defines tutorsApi
 * @since 24/06/2021
 */

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
   */
  router.post('/tutors', function (req, res) {
    /**
     * Add sequelize code to create a Tutor record via req.body,
     * return the result to the user with res.json
     */
    db.Tutor.create({
      email: req.body.email,
      password: req.body.password,
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * GET route for returning one Tutor record
   * @method SELECT * FROM tutors WHERE email = <email>
   */
  router.get('/tutors/:email', async (req, res) => {
    /**
     * Add sequelize code to find a Tutor record where
     * the Tutor.email is equal to req.params.email.
     * return the result to the user with res.json
     */
    db.Tutor.findOne({
      where: {
        email: req.params.email,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * DELETE route for deleting Tutor records
   * @method SELECT * FROM tutors WHERE email = <email>
   */
  router.delete('/tutors/:email', function (req, res) {
    /**
     * Add sequelize code to delete a Tutor record where
     * the Tutor.email is equal to req.params.email.
     * return the result to the user with res.json
     */
    db.Tutor.destroy({
      where: {
        email: req.params.email,
      },
    }).then(function (result) {
      res.json(result);
    });
  });

  /**
   * PUT route for updating Tutor records
   * @method SELECT * FROM tutors WHERE email = <email>
   */
  router.put('/tutors/:email', function (req, res) {
    /**
     * Add sequelize code to update a Tutor record via
     * the values of req.body, where
     * email is equal to req.body.email.
     * return the result to the user with res.json
     */
    db.Tutor.update(
      {
        email: req.body.email,
        password: req.body.password,
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
