/**
 * Endpoint: `POST /api/retrievenotifications`
 * Class definition of `POST` instance that issues a notification to students
 * @see api.controller.retrieveNotifications
 * @see api.validator.retrieveNotifications
 * @file defines RetrieveNotifications
 */

import * as db from '../models/index';

import {
  getEmailsFromMessage,
  getAllUnsuspendedStudentsByTutor,
  getAllUnsuspendedStudentsByEmails,
} from '../helpers/index';

class RetrieveNotifications {
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.notification = validatedArgs.notification;
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
     * Return an error if the tutor doesn't exist
     */
    if (!tutor) {
      return {
        data: {},
        message: 'An account could not be found',
        code: 400,
      };
    }
    /**
     * Initialize an empty array of to-be recipients
     */
    const allRecipients = [];
    /**
     * Get a list of student emails from the request
     */
    const mentionedStudents = getEmailsFromMessage(this.notification);
    /**
     * Get a list of all existing students already assigned to this tutor,
     * as they should receive this notification by default, if they are not suspended
     */
    const unsuspendedStudents =
      await getAllUnsuspendedStudentsByTutor(this.tutor);
    /**
     * If we are left with more than one unsuspended student...
     */
    if (unsuspendedStudents.students.length > 0) {
      /**
       * Add them to the `allRecipients` array
       */
      allRecipients.push(
        ...unsuspendedStudents.students.map((student) => student)
      );
    }
    /**
     * If there are more than one students mentioned in the notification
     */
    if (mentionedStudents.length > 0) {
      /**
       * Reduce the list of mentioned students to ones that are not suspended
       */
      const approved = await getAllUnsuspendedStudentsByEmails(
        mentionedStudents
      );
      /**
       * If we are left with more than one unsuspended student...
       */
      if (approved.students.length > 0) {
        /**
         * Add them to the `allRecipients` array
         */
        allRecipients.push(
          ...approved.students.map((student) => student)
        );
      }
    }
    /**
     * Register the a studentnotification with the recipients, tutor, and notification message
     */
    for (const recipient in allRecipients) {
      /**
       * Identify one email from the array of recipients
       */
      const email = allRecipients[recipient];
      /**
       * Create a n:m StudentNotification record for each student
       */
      await db.StudentNotification.create({
        tutor: this.tutor,
        student: email,
        title: `[Tutor ${this.tutor.split('@')[0]}]: ${new Date()}`,
        message: this.notification,
      });
    }

    await db.StudentNotification.sync();

    return {
      tutor: this.tutor,
      recipients: allRecipients.map((student) => student),
      message: 'Notification posted',
      code: 200,
    };
  }
}

module.exports = RetrieveNotifications;
