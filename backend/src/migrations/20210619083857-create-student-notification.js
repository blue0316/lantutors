'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Students',
          key: 'email',
          as: 'student',
        },
      },
      tutor: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Tutors',
          key: 'email',
          as: 'tutor',
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: `[Lantutors] Message from your Tutor`,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: `Welcome to Lantutors`,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // .then(() => {
    //   return queryInterface.addConstraint(
    //     'StudentNotifications',
    //     ['student'],
    //     {
    //       type: 'foreign key',
    //       fields: ['student'],
    //       name: 'StudentNotifications_ibfk_2',
    //       references: {
    //         model: 'Students',
    //         key: 'email',
    //         as: 'student',
    //       },
    //     }
    //   );
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentNotifications');
  },
};
