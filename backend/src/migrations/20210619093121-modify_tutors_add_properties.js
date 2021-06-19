'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tutors', 'username', {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn('Tutors', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.changeColumn('Tutors', 'password', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tutors', 'username', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Tutors', 'email', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Tutors', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
