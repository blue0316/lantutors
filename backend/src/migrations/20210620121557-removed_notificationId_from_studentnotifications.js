module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'StudentNotifications', // table name
        'notificationId' // new field name
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.addColumn(
        'StudentNotifications',
        'notificationId'
      ),
    ]);
  },
};
