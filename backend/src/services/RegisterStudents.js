/**
 * Endpoint: `POST /api/register`
 * Class definition of `POST` instance that allows a tutor to register students
 * @see api.controller.registerStudents
 * @see api.validator.registerStudents
 * @file defines RegisterStudents
 */

import * as db from '../models/index';

import { getAllStudentsByEmail } from '../helpers/index';
class RegisterStudents {
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.students = validatedArgs.students;
  }

  async call() {
    /**
     * Identify the tutor from the database
     */
    const tutor = await db.Tutor.findOne({
      raw: true,
      where: { email: this.tutor },
    });
    /**
     * Create a tutor record if the requester isn't registered
     */
    if (!tutor) {
      db.Tutor.create({
        email: this.tutor,
        password: this.tutor.split('@')[0],
      });
    }
    /**
     * Get a list of student emails from the request
     */
    const incomingStudents = this.students;
    /**
     * Get a list of all existing students
     */
    const currentStudents = await getAllStudentsByEmail();
    /**
     * Iterate through the request's students array
     */
    for (const incoming in incomingStudents) {
      /**
       * Identify one email from the array of students
       */
      const email = incomingStudents[incoming];
      /**
       * If there are already-registered students in the request...
       */
      if (
        currentStudents.students.includes(incomingStudents[incoming])
      ) {
        /**
         * Assign them to the requesting tutor
         */
        await db.TutorStudent.create({
          tutor: this.tutor,
          student: email,
        });
      } else {
        /**
         * All else are otherwise unregistered and unassigned
         * So create a student record for those
         */
        await db.Student.create({
          email: email,
        });
        /**
         * And then assign them to the requesting tutor
         */
        await db.TutorStudent.create({
          tutor: this.tutor,
          student: email,
        });
      }
    }

    await db.Student.sync();
    await db.TutorStudent.sync();

    return {
      tutor: this.tutor,
      students: incomingStudents.map((student) => student),
      message: 'Students Registered',
      code: 200,
    };
  }
}

module.exports = RegisterStudents;
