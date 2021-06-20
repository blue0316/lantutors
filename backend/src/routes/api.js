import express from 'express';
import * as db from '../models/index';
import { validate } from 'express-validation';

import { studentsApi } from './student';
import { tutorsApi } from './tutor';
import { tutorStudentsApi } from './tutorstudent';
import { notificationsApi } from './notification';
import {
  getAllStudentsByTutorName,
  getAllStudentsByEmail,
} from '../helpers/index';
import * as apiController from '../controllers/api.controller';
import * as apiValidator from '../controllers/api.validator';

const router = express.Router();

studentsApi(db, router);
tutorsApi(db, router);
tutorStudentsApi(db, router);
notificationsApi(db, router);

/**
 * GET all common tutorstudents
 */
router.get('/retrievenotifications', async (req, res) => {
  db.StudentNotification.findAll({}).then(function (result) {
    res.json(result);
  });
});

// api/register
router.post(
  '/register',
  validate(apiValidator.register, { keyByField: true }),
  apiController.register
);

module.exports = router;
