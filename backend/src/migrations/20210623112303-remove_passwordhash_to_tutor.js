'use strict';
// import { genSaltSync, hash } from 'bcryptjs';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tutors', 'passwordHash');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tutors', 'passwordHash');
  },
};
