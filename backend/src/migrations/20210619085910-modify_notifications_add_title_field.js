'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications', // table name
        'title', // new field name
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Notifications', // table name
        'tutorName', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'Tutors',
            key: 'username',
            as: 'tutorName',
          },
        }
      ),
      queryInterface.removeColumn(
        'Notifications', // table name
        'studentId', // new field name
        {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'Students',
            key: 'id',
            as: 'studentId',
          },
        }
      ),
    ]).then(() => {
      return queryInterface.addConstraint('Tutors', ['tutorName'], {
        type: 'foreign key',
        name: 'Notifications_tutorName_foreign_idx',
        references: {
          table: 'Tutors',
          field: 'tutorName',
          key: 'username',
          as: 'tutorName',
        },
      });
    });
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Notifications', 'title'),
      queryInterface.removeColumn('Notifications', 'tutorName'),
      queryInterface.addColumn('Notifications', 'studentId'),
    ]);
  },
};
