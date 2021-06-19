'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tutors',
      [
        {
          username: 'John',
          email: 'john@john.com',
          password: 'john',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Alex',
          email: 'alex@alex.com',
          password: 'alex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Alice',
          email: 'alice@alice.com',
          password: 'alice',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Henry',
          email: 'henry@henry.com',
          password: 'henry',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Blake',
          email: 'blake@blake.com',
          password: 'blake',
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
