'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      // queryInterface.removeIndex(
      //   'Tutors', // table name
      //   'username_unique_idx' // new field name
      // ),
      // queryInterface.removeConstraint(
      //   'Tutors', // table name
      //   'username_unique_idx' // new field name
      // ),
      // queryInterface.removeColumn(
      //   'Tutors', // table name
      //   'username' // new field name
      // ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.addColumn('Tutors', 'username'),
    ]);
  },
};
