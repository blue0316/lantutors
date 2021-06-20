'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tutors', 'password', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        validateEmail(email, next) {
          const re = /\S+@\S+\.\S+/;
          if (re.test(email)) {
            return next();
          } else {
            return next('Email is invalid');
          }
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tutors', 'password', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
  },
};
