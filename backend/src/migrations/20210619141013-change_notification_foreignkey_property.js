// 'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications', // table name
        'tutorName', // new field name
        {
          type: Sequelize.STRING,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false,
          references: {
            model: 'Tutors',
            key: 'username',
            as: 'tutorName',
          },
        }
      ),
    ]).then(() => {
      return queryInterface.addConstraint('Tutors', ['tutorName'], {
        type: 'foreign key',
        name: 'Notifications_tutorName_foreign_idx',
        fields: ['tutorName'],
        references: {
          table: 'Tutors',
          key: 'username',
          as: 'tutorName',
        },
      });
    });
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Notifications', 'tutorName'),
    ]);
  },
};
