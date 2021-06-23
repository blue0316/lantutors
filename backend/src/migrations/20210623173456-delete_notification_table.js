'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ResetTokens');
    await queryInterface.dropTable('Notifications');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications');
    await queryInterface.createTable('ResetTokens');
  },
};
