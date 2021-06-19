'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'Notifications', // table name
        'tutorId' // new field name
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.addColumn('Notifications', 'tutorId'),
    ]);
  },
};
