'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        email: 'elias@elias.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'noah@noah.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'kate@kate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
