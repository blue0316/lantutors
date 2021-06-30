'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tutors',
      [
        {
          email: 'john@john.com',
          password: 'john',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'henry@henry.com',
          password: 'henry',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'isabel@isabel.com',
          password: 'isabel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'mary@mary.com',
          password: 'mary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'alfred@alfred.com',
          password: 'alfred',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tutors', null, {});
  },
};
