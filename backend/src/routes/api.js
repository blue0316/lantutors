import express from 'express';
import * as db from '../models/index';
import { validate } from 'express-validation';

import { studentsApi } from './student';
import { tutorsApi } from './tutor';
import { tutorStudentsApi } from './tutorstudent';
import { notificationsApi } from './notification';

import * as apiController from '../controllers/api.controller';
import * as apiValidator from '../controllers/api.validator';

const router = express.Router();

studentsApi(db, router);
tutorsApi(db, router);
tutorStudentsApi(db, router);
notificationsApi(db, router);

/**
 * GET all raw students
 */
router.get('/allstudents', async (req, res) => {
  db.Student.findAll({}).then(function (result) {
    res.json(result);
  });
});

/**
 * GET all raw tutors
 */
router.get('/alltutors', async (req, res) => {
  db.Tutor.findAll({}).then(function (result) {
    res.json(result);
  });
});

/**
 * GET all raw tutor-students
 */
router.get('/alltutorstudents', async (req, res) => {
  db.TutorStudent.findAll({}).then(function (result) {
    res.json(result);
  });
});

/**
 * GET all raw notificaations
 */
router.get('/allnotifications', async (req, res) => {
  db.StudentNotification.findAll({}).then(function (result) {
    res.json(result);
  });
});

/**
 * GET all common tutorstudents
 */
router.get('/retrievenotifications', async (req, res) => {
  db.StudentNotification.findAll({}).then(function (result) {
    res.json(result);
  });
});

/**
 * Endpoint: `POST /api/account`
 * @see RegisterTutor
 * @see api.validators.registerTutor
 * @see api.controller.registerTutoor
 */
router.post(
  '/account',
  validate(apiValidator.registerTutor, { keyByField: true }),
  apiController.registerTutor
);

/**
 * Endpoint: `POST /api/register`
 * @see RegisterStudents
 * @see api.validators.registerStudents
 * @see api.controller.registerStudents
 */
router.post(
  '/register',
  validate(apiValidator.registerStudents, {
    keyByField: true,
    context: true,
  }),
  apiController.registerStudents
);

/**
 * Endpoint: `POST /api/retrievenotifications`
 * @see RetrieveNotifications
 * @see api.validators.retrieveNotifications
 * @see api.controller.retrieveNotifications
 */
router.post(
  '/retrieveNotifications',
  validate(apiValidator.retrieveNotifications, { keyByField: true }),
  apiController.retrieveNotifications
);

/**
 * Endpoint: `POST /api/suspend`
 * @see SuspendStudent
 * @see api.validators.suspendStudent
 * @see api.controller.suspendStudent
 */
router.post(
  '/suspend',
  validate(apiValidator.suspendStudent, { keyByField: true }),
  apiController.suspendStudent
);

/**
 * Endpoint: `GET /api/getcommonstudents`
 * @see GetCommonStudents
 * @see api.validators.getCommonStudents
 * @see api.controller.getCommonStudents
 */
router.get(
  '/getcommonstudents',
  validate(apiValidator.getCommonStudents, { keyByField: true }),
  apiController.getCommonStudents
);

module.exports = router;
