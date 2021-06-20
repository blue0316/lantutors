'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'StudentNotifications', // table name
        'tutorName', // new field name
        {
          type: Sequelize.STRING,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Tutors',
            key: 'username',
            as: 'tutorName',
          },
        }
      ),
      queryInterface.changeColumn(
        'StudentNotifications', // table name
        'studentName', // new field name
        {
          type: Sequelize.STRING,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'Students',
            key: 'username',
            as: 'studentName',
          },
        }
      ),
      queryInterface.addColumn(
        'StudentNotifications', // table name
        'title', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: `[Lantutors] Message from your Tutor`,
        }
      ),
      queryInterface.addColumn(
        'StudentNotifications', // table name
        'message', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: `Welcome to Lantutors`,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn(
        'StudentNotifications',
        'tutorName'
      ),
      queryInterface.removeColumn('StudentNotifications', 'title'),
      queryInterface.removeColumn('StudentNotifications', 'message'),
    ]);
  },
};
