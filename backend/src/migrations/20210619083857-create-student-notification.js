'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('StudentNotifications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        notificationId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Notifications',
            key: 'id',
            as: 'notificationId',
          },
        },
        studentId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Students',
            key: 'id',
            as: 'studentId',
          },
        },
        studentName: {
          type: Sequelize.STRING,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Students',
            key: 'username',
            as: 'studentName',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface.addConstraint(
          'StudentNotifications',
          ['studentName'],
          {
            type: 'foreign key',
            fields: ['studentName'],
            name: 'StudentNotifications_ibfk_2',
            references: {
              model: 'Students',
              key: 'username',
              as: 'studentName',
            },
          }
        );
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentNotifications');
  },
};
