import express from 'express';
import * as db from '../models/index';
import { validate } from 'express-validation';

import * as apiController from '../controllers/api.controller';
import * as apiValidator from '../controllers/api.validator';

const router = express.Router();

// GET all tutors
router.get('/tutors', async (req, res) => {
  db.Tutor.findAll({}).then(function (result) {
    res.json(result);
  });
});

// GET all students
router.get('/students', async (req, res) => {
  db.Student.findAll({}).then(function (result) {
    res.json(result);
  });
});

// GET all common tutorstudents
router.get('/commonstudents', async (req, res) => {
  db.TutorStudent.findAll({}).then(function (result) {
    res.json(result);
  });
});

// GET all common tutorstudents
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
