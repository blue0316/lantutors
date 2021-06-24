require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const request = require('supertest');
const app = require('../testEntry');
const faker = require('faker');

import factories from '../testUtils/factories';
const { truncate } = require('../testHelper');

describe('Api Controller', () => {
  describe('Register API', () => {
    describe('Invalid body', () => {
      beforeEach(() => {
        return truncate();
      });

      it('should fail without tutor ', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send();
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail without students ', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: faker.internet.email(),
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { students: '"students" is required' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail if tutor is not an email', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: faker.random.word(),
            students: [
              faker.internet.email(),
              faker.internet.email(),
            ],
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { tutor: '"tutor" must be a valid email' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail if students are not in email format', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: faker.internet.email(),
            students: ['not@email', 'email.com'],
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { 0: '"students[0]" must be a valid email' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe('Valid body', () => {
      beforeEach(() => {
        return truncate();
      });
      it('should pass for new tutor and students', async (done) => {
        /**
         * Register all new tutor and student emails without model instances
         */
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: faker.internet.email(),
            students: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ],
          });
        const { message } = body;

        expect(message).toEqual('Students Registered');
        expect(statusCode).toEqual(200);
        done();
      });

      it('should pass for existing tutor and new students', async (done) => {
        /**
         * Instantiate one new tutor
         */
        const tutor = await factories.create('Tutor', {
          email: faker.internet.email(),
          password: faker.internet.password(),
        });
        /**
         * Register new unassigned student emails with pre-existing tutor
         */
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: tutor.email,
            students: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ],
          });
        const { message } = body;

        expect(message).toEqual('Students Registered');
        expect(statusCode).toEqual(200);
        done();
      });

      it('should pass for new tutor and old students', async (done) => {
        /**
         * Instantiate three students
         */
        const students = await factories
          .createMany('Student', 3, [
            { email: faker.internet.email() },
            { email: faker.internet.email() },
            { email: faker.internet.email() },
          ])
          .then((results) => results.map((result) => result.email));
        /**
         * Register existing students to new unregistered tutor
         */
        const { statusCode, body } = await request(app)
          .post('/api/register')
          .send({
            tutor: faker.internet.email(),
            students: students.map((student) => student),
          });
        const { message } = body;

        expect(message).toEqual('Students Registered');
        expect(statusCode).toEqual(200);
        done();
      });
    });
  });

  describe('GetCommonStudents API', () => {
    describe('Invalid query', () => {
      beforeEach(() => {
        return truncate();
      });
      it('should fail without tutor ', async (done) => {
        const { statusCode, body } = await request(app)
          .get('/api/getcommonstudents?tutor=', {
            tutor: '',
          })
          .send();
        const { message, details } = body;
        console.log(body);
        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      const error = faker.random.word();

      it('should fail if tutor is not an email ', async (done) => {
        const { statusCode, body } = await request(app)
          .get('/api/getcommonstudents' + `?tutor=${error}'`, {
            tutor: error,
          })
          .send();
        const { message, details } = body;
        console.log(body);

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { tutor: '"tutor" must be a valid email' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe('Valid query', () => {
      beforeEach(() => {
        return truncate();
      });
      it('should pass for single common tutor ', async (done) => {
        const tutor = 'constant@tutor.com';
        const { statusCode, body } = await request(app)
          .get('/api/getcommonstudents' + `?tutor=${tutor}`, {
            tutor: tutor,
          })
          .send();
        const { message, details } = body;

        expect(message).toEqual('Common Students returned');
        expect(details).toEqual([
          { tutor: '"tutor" must be a valid email' },
        ]);
        expect(statusCode).toEqual(200);
        done();
      });

      it('should pass for multiple common tutor', async (done) => {
        /**
         * Existing Tutor
         */
        const constantTutor = 'constant@tutor.com';
        /**
         * Instantiate one new tutor
         */
        const commonTutor = await factories.create('Tutor', {
          email: 'common@tutor.com',
          password: faker.internet.password(),
        });
        /**
         * Register existing students `constants<1-3>@students`
         * and new students `common<1-3>@students`
         * with existing new tutor
         */
        await request(app)
          .post('/api/register')
          .send({
            tutor: commonTutor.email,
            students: [
              'constant1@student.com',
              'constant2@student.com',
              'constant3@student.com',
              'common1@student.com',
              'common2@student.com',
              'common3@student.com',
            ],
          });
        const { statusCode, body } = await request(app)
          .get(
            '/api/getcommonstudents' +
              `?tutor=${constantTutor}` +
              `&tutor=${commonTutor.email}`,
            {
              tutor: [constantTutor, commonTutor.email],
            }
          )
          .send();
        const { message } = body;

        expect(message).toEqual('Common Students returned');

        expect(statusCode).toEqual(200);
        done();
      });
    });
  });

  describe('SuspendStudent API', () => {
    beforeEach(() => {
      return truncate();
    });
    describe('Invalid body', () => {
      it('should fail if student is empty', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/suspend')
          .send({
            student: '',
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { student: '"student" is not allowed to be empty' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail if student is not an email', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/suspend')
          .send({
            student: faker.random.word(),
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { student: '"student" must be a valid email' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail for nonexistent student', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/suspend')
          .send({
            student: faker.internet.email(),
          });
        const { message } = body;

        expect(message).toEqual('An account could not be found');

        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe('Valid body', () => {
      it('should pass for existing student', async (done) => {
        /**
         * Initialize a random email
         */
        const email = faker.internet.email();
        /**
         * Instantiate one new student with it
         */
        const student = await factories.create('Student', {
          email: email,
          suspended: 0,
        });
        /**
         * Suspend the new existing student by email
         */
        const { statusCode, body } = await request(app)
          .post('/api/suspend')
          .send({
            student: student.email,
          });
        const { message } = body;

        expect(message).toEqual(
          `${email.split('@')[0]} has been suspended`
        );
        expect(statusCode).toEqual(200);
        done();
      });
    });
  });

  describe('ReceiveNotifications API', () => {
    beforeEach(() => {
      return truncate();
    });
    describe('Invalid body', () => {
      it('should fail if tutor is empty', async (done) => {
        const { statusCode, body } = await request(app)
          .post('/api/retrievenotifications')
          .send({
            notification: faker.hacker.phrase(),
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it('should fail if notification is empty', async (done) => {
        /**
         * Register existing students `constants<1-3>@students`
         * with existing new tutor
         */
        const { statusCode, body } = await request(app)
          .post('/api/retrievenotifications')
          .send({
            tutor: 'constant@tutor.com',
          });
        const { message, details } = body;

        expect(message).toEqual('Validation Failed');
        expect(details).toEqual([
          { notification: '"notification" is required' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });
    });
  });

  describe('Valid body', () => {
    beforeEach(() => {
      return truncate();
    });
    it('should fail if tutor doesnt exist', async (done) => {
      /**
       * Register random students emails to an unregistered tutor
       */
      const { statusCode, body } = await request(app)
        .post('/api/retrievenotifications')
        .send({
          tutor: faker.internet.email(),
          notification:
            faker.hacker.phrase() +
            faker.internet.email() +
            faker.hacker.phrase() +
            faker.internet.email(),
        });
      const { message } = body;

      expect(message).toEqual('An account could not be found');
      expect(statusCode).toEqual(400);
      done();
    });

    it('should pass and retrieve students that belongs to the tutor', async (done) => {
      /**
       * Instantiate a new tutor
       */
      const tutor = await factories.create('Tutor', {
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      /**
       * Initialize three new emails
       */
      const student1 = faker.internet.email();
      const student2 = faker.internet.email();
      const student3 = faker.internet.email();
      /**
       * Instantiate new students with those emails
       */
      await factories.createMany('Student', 3, [
        { email: student1 },
        { email: student2 },
        { email: student3 },
      ]);
      /**
       * Associate those new students to the tutor
       */
      await factories.createMany('TutorStudent', 3, [
        { student: student1, tutor: tutor.email },
        { student: student2, tutor: tutor.email },
        { student: student3, tutor: tutor.email },
      ]);
      /**
       * Issue a notification from the tutor
       * with no mentioned students
       */
      const { statusCode, body } = await request(app)
        .post('/api/retrievenotifications')
        .send({
          tutor: tutor.email,
          notification: faker.hacker.phrase(),
        });
      const { message } = body;

      expect(message).toEqual('Notification posted');
      expect(statusCode).toEqual(200);
      done();
    });

    it('should pass and retrieve students that belongs to the tutor and mentioned students', async (done) => {
      /**
       * Instantiate a new tutor
       */
      const tutor = await factories.create('Tutor', {
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      /**
       * Initialize three new emails to assign to tutor
       */
      const student1 = faker.internet.email();
      const student2 = faker.internet.email();
      const student3 = faker.internet.email();
      /**
       * Initialize three new emails to be unassignged but mentioned
       */
      const mentioned1 = faker.internet.email();
      const mentioned2 = faker.internet.email();
      const mentioned3 = faker.internet.email();
      /**
       * Instantiate new students with those emails
       */
      await factories.createMany('Student', 6, [
        { email: student1 },
        { email: student2 },
        { email: student3 },
        { email: mentioned1 },
        { email: mentioned2 },
        { email: mentioned3 },
      ]);
      /**
       * Associate only three of the students to the tutor
       */
      await factories.createMany('TutorStudent', 3, [
        { student: student1, tutor: tutor.email },
        { student: student2, tutor: tutor.email },
        { student: student3, tutor: tutor.email },
      ]);
      /**
       * Issue a notification from `tutor` that doesn't mention
       * `students` belonging to `tutor` and  includes
       * students `mentioned` in the body of the notification
       */
      const { statusCode, body } = await request(app)
        .post('/api/retrievenotifications')
        .send({
          tutor: tutor.email,
          notification:
            mentioned1 +
            ' ' +
            faker.random.word() +
            ' ' +
            'constant1@student.com' +
            ' ' +
            faker.random.word() +
            ' ' +
            mentioned2 +
            ' ' +
            'constant2@student.com' +
            ' ' +
            faker.random.word() +
            ' ' +
            mentioned3 +
            faker.random.word(),
        });
      const { message } = body;

      expect(message).toEqual('Notification posted');

      expect(statusCode).toEqual(200);
      done();
    });

    it('should pass and retrieve students that are not suspended only', async (done) => {
      /**
       * Instantiate a new tutor
       */
      const tutor = await factories.create('Tutor', {
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      /**
       * Initialize three new emails to assign to tutor
       */
      const student1 = faker.internet.email();
      const student2 = faker.internet.email();
      const student3 = faker.internet.email();
      /**
       * Initialize three new emails to be unassignged
       */
      const mentioned1 = faker.internet.email();
      const mentioned2 = faker.internet.email();
      const mentioned3 = faker.internet.email();
      /**
       * Instantiate all new students with those emails
       * Suspend two students belonging students and two mentioned students
       */
      await factories.createMany('Student', 6, [
        { email: student1, suspended: true },
        { email: student2, suspended: true },
        { email: student3 },
        { email: mentioned1, suspended: true },
        { email: mentioned2, suspended: true },
        { email: mentioned3 },
      ]);
      /**
       * Associate all of the students to the tutor
       */
      await factories.createMany('TutorStudent', 3, [
        { student: student1, tutor: tutor.email },
        { student: student2, tutor: tutor.email },
        { student: student3, tutor: tutor.email },
        { student: mentioned1, tutor: tutor.email },
        { student: mentioned2, tutor: tutor.email },
        { student: mentioned3, tutor: tutor.email },
      ]);

      /**
       * Issue a notification from the tutor that includes
       * and mention all students
       */

      const { statusCode, body } = await request(app)
        .post('/api/retrievenotifications')
        .send({
          tutor: tutor.email,
          notification:
            student1 +
            ' ' +
            faker.random.word() +
            ' ' +
            student2 +
            ' ' +
            faker.random.word() +
            ' ' +
            student3 +
            ' ' +
            mentioned1 +
            ' ' +
            faker.random.word() +
            ' ' +
            mentioned2 +
            ' ' +
            faker.random.word() +
            ' ' +
            mentioned3,
        });
      const { message } = body;

      expect(message).toEqual('Notification posted');

      expect(statusCode).toEqual(200);
      done();
    });
  });
});
