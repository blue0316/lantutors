'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'Tutors', // table name
        'username' // new field name
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.addColumn('Tutors', 'username'),
      queryInterface.addColumn('Notifications', 'tutorName'),
    ]);
  },
};
