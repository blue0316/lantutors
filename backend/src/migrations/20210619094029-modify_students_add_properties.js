'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'username', {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn('Students', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.changeColumn('Students', 'suspended', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'username', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Students', 'email', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Students', 'suspended', {
      type: Sequelize.BOOLEAN,
    });
  },
};
