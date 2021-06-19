'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        username: 'elias',
        email: 'elias@elias.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'noah',
        email: 'noah@noah.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'kate',
        email: 'kate@kate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'chris',
        email: 'chris@chris.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  },
};
