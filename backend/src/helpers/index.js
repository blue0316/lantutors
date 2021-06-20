import * as db from '../models/index';

export const successResponse = (req, res, data = {}, code = 200) =>
  res.status(code).json({
    ...data,
  });

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

export const getAllStudentsByTutorName = (tutorName) => {
  return db.TutorStudent.findAll({
    where: {
      tutorName: tutorName,
    },
  }).then((results) => ({
    tutor: tutorName,
    students: results.map((result) => result.studentName),
  }));
};

// export const getAllCommonStudents = () => {
//   return db.TutorStudent.findAll({}).then((results) => ({
//     tutor: tutorName,
//     students: results.map((result) => result.studentName),
//   }));
// };
