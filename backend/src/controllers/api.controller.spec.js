require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const request = require('supertest');
const app = require('../testEntry');
const faker = require('faker');

const { truncate } = require('../testHelper');

const { fake } = require('faker');

describe('Api Controller', () => {
  describe('Register API', () => {
    describe('Invalid body', () => {
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
        done();
      });

      it('should fail if tutor is not an email', async (done) => {
        done();
      });

      it('should fail if students are not in email format', async (done) => {
        done();
      });
    });

    describe('Valid body', () => {
      it('should pass for new tutor and students', async (done) => {
        done();
      });

      it('should pass for existing tutor and new students', async (done) => {
        done();
      });

      it('should pass for new tutor and old students', async (done) => {
        done();
      });
    });
  });

  describe('GetCommonStudents API', () => {
    describe('Invalid query', () => {
      it('should fail without tutor ', async (done) => {
        done();
      });

      it('should fail if tutor is not an email ', async (done) => {
        done();
      });
    });

    describe('Valid query', () => {
      it('should pass for single common tutor ', async (done) => {
        done();
      });

      it('should pass for multiple common tutor', async (done) => {
        done();
      });
    });
  });

  describe('SuspendStudent API', () => {
    describe('Invalid body', () => {
      it('should fail for nonexistent student', async (done) => {
        done();
      });
    });

    describe('Valid body', () => {
      it('should pass for existing student', async (done) => {
        done();
      });
    });
  });

  describe('ReceiveNotifications API', () => {
    describe('Invalid body', () => {
      it('should fail if tutor is empty', async (done) => {
        done();
      });

      it('should fail if notification is empty', async (done) => {
        done();
      });
    });
  });

  describe('Valid body', () => {
    it('should fail if tutor doesnt exist', async (done) => {
      done();
    });

    it('should pass and retrieve students that belongs to the tutor', async (done) => {
      done();
    });

    it('should pass and retrieve students that belongs to the tutor and mentioned students', async (done) => {
      done();
    });

    it('should pass and retrieve students that are not suspended only', async (done) => {
      done();
    });
  });
});
