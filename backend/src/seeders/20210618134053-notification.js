'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Notifications',
      [
        {
          title: 'attention from tutor John',
          message: 'testing a broadcast from @john',
          tutorName: 'John',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'attention from tutor Alex',
          message: 'testing a broadcast from @Alex',
          tutorName: 'Alex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'attention from tutor Alice',
          message: 'testing a broadcast from @Alice',
          tutorName: 'Alice',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'attention from tutor Henry',
          message: 'testing a broadcast from @Henry',
          tutorName: 'Henry',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'attention from tutor Blake',
          message: 'testing a broadcast from @Blake',
          tutorName: 'Blake',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    return await queryInterface.bulkInsert(
      'StudentNotifications',
      [
        {
          notificationId: 3,
          studentName: 'elias',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 3,
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 3,
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 3,

          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 5,

          studentName: 'elias',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 5,
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 5,
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 5,

          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 4,

          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 4,

          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 4,

          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 6,
          studentName: 'noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 6,
          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 6,

          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 7,

          studentName: 'kate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notificationId: 7,

          studentName: 'chris',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Notifications', null, {});
    return queryInterface.bulkDelete(
      'StudentNotifications',
      null,
      {}
    );
  },
};
