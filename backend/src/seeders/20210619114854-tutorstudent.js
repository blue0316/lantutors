'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TutorStudents',
      [
        {
          tutorName: 'John',
          studentName: 'elias',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'John',
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'John',
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'John',
          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alice',
          studentName: 'elias',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alice',
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alice',
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alice',
          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alex',
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alex',
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Alex',
          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Henry',
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Henry',
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Henry',
          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Blake',
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tutorName: 'Blake',
          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TutorStudents', null, {});
  },
};
