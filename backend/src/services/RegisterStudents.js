import * as db from '../models/index';
// import { Sequelize, Op } from 'sequelize';
import { filter, findIndex, uniq } from 'lodash';
const Op = require('Sequelize').Op;
class RegisterStudents {
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.students = validatedArgs.students;
  }

  async call() {
    /**
     * Find the tutor's record from the request
     */
    const tutor = await db.Tutor.findOne({
      raw: true,
      where: { email: this.tutor },
    });

    let unlistedStudents = [];
    /**
     * Find existing students from the request
     */
    let existingStudents = await db.Student.findAll({
      raw: true,
      where: db.sequelize.or({
        email: { [Op.in]: this.students },
      }),
    });
    /**
     * Find new students from the request
     */
    const incomingStudents = filter(
      this.students,
      (email) =>
        findIndex(
          existingStudents,
          (student) => student.email === email
        ) === -1
    );
    /**
     * If there are any new students...
     */
    if (incomingStudents.length > 0) {
      const createNewStudents = incomingStudents.map((email) => {
        return db.Student.create({ email }).then((result) =>
          result.toJSON()
        );
      });
      /**
       * Create a new student record for each
       */
      const newStudents = await Promise.all(createNewStudents);
      /**
       * Identify the previously unlisted students
       */
      unlistedStudents = unlistedStudents.concat(newStudents);
      /**
       * Add the newly registered students to the array of existing students
       */
      existingStudents = existingStudents.concat(newStudents);
    }
    const { students } = await db.TutorStudent.findAll({}).then(
      (results) => ({
        students: results.map((result) => result),
      })
    );
    return {
      tutor: tutor,
      students: {
        new: unlistedStudents,
        all: existingStudents,
      },
    };
    // res.json({
    //   tutor: tutor,
    //   students: {
    //     new: unlistedStudents,
    //     all: existingStudents,
    //   },
    // });
    // return {
    //   tutor: tutor,
    //   students: {
    //     new: unlistedStudents,
    //     all: existingStudents,
    //   },
    // };
  }
}

module.exports = RegisterStudents;
