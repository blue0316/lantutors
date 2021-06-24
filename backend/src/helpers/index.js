/**
 * Helpers
 *
 * Shared query and response methods
 * @file defines helpers
 */

import * as db from '../models/index';
const { QueryTypes } = require('sequelize');

/**
 * Default Success response helper
 *
 */
export const successResponse = (req, res, data = {}, code = 200) =>
  res.status(code).json({
    ...data,
  });

/**
 * Default Error response helper
 *
 */
export const errorResponse = (
  req,
  res,
  message = 'Something went wrong',
  code = 500,
  error = {}
) =>
  res.status(500).json({
    code,
    message,
    error,
  });

export const getAllStudentsByEmail = () => {
  return db.Student.findAll({}).then((results) => ({
    students: results.map((result) => result.email),
  }));
};

/**
 * Get all students by tutor
 *
 * Query the `TutorStudent` model to select all students by their assigned `tutor`
 * @date 2021-06-24
 * @param {string} tutor
 * @return {object} an object with tutor and student arrays
 */
export const getAllStudentsByTutor = (tutor) => {
  return db.TutorStudent.findAll({
    where: {
      tutor: tutor,
    },
  }).then((results) => ({
    tutor: tutor,
    students: results.map((result) => result.student),
  }));
};

/**
 * Get emails from message
 *
 * String method to find and match emails from a string, remove an `@` mention,
 * and append to an array
 * @date 2021-06-24
 * @param {string} message
 * @return {array} an array of emails
 */
export const getEmailsFromMessage = (message) => {
  const result = [];
  const emailArray = message.match(
    /@([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  );
  if (emailArray) {
    result.push(...emailArray.map((email) => email.substr(1)));
  }
  return result;
};

/**
 * Get all unsuspended students by tutor
 *
 * Raw query the database to select all students by their assigned `tutor`
 * that are not suspended
 * @date 2021-06-24
 * @param {string} tutor
 * @return {array} an array of unsuspended students' emails assigned to tutor
 */
export const getAllUnsuspendedStudentsByTutor = (tutor) => {
  return db.sequelize
    .query(
      `
        SELECT s.email from Tutors t
        INNER JOIN TutorStudents ts on t.email = ts.tutor
        INNER JOIN Students s on s.email = ts.student
        WHERE t.email = :tutor AND s.suspended != 1
  `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          tutor: tutor,
        },
      }
    )
    .then((results) => ({
      students: results.map((result) => result.email),
    }));
};

/**
 * Get all unsuspended students by emails
 *
 * Raw query the database to select all students by `emails`
 * that are not suspended
 * @date 2021-06-24
 * @param {array} emails
 * @return {array} an array of unsuspended students' emails
 */
export const getAllUnsuspendedStudentsByEmails = (emails) => {
  return db.sequelize
    .query(
      `
        SELECT s.email from Students s
        WHERE s.email IN(:emails) AND s.suspended != 1
  `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          emails: emails.map((email) => email),
        },
      }
    )
    .then((results) => ({
      students: results.map((result) => result.email),
    }));
};

/**
 * Get common students by tutors
 *
 * Raw query the database to select and join ONLY the students
 * that have a TutorStudent record with ALL the tutors in `tutors`
 * @date 2021-06-24
 * @param {array} tutors
 * @return {array} an array of students' emails common to an array of tutors
 */
export const getCommonStudentsByTutors = (tutors) => {
  return db.sequelize
    .query(
      `
        SELECT s.email from Tutors t
        INNER JOIN TutorStudents ts on t.email = ts.tutor
        INNER JOIN Students s on s.email = ts.student
        WHERE t.email IN(:query) 
        GROUP BY ts.student
        HAVING (COUNT(ts.student) = :common)
  `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          common: tutors.length,
          query: tutors.map((tutor) => tutor),
        },
      }
    )
    .then((results) => results);
};
