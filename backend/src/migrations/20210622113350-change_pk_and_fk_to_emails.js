'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TutorStudents', 'tutorName');
    await queryInterface.addColumn('TutorStudents', 'tutor', {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Tutors',
        key: 'email',
        as: 'tutor',
      },
    });
    await queryInterface.removeColumn('TutorStudents', 'studentName');
    await queryInterface.addColumn('TutorStudents', 'student', {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Students',
        key: 'email',
        as: 'student',
      },
    });
    await queryInterface.removeColumn(
      'StudentNotifications',
      'tutorName'
    );
    await queryInterface.addColumn('StudentNotifications', 'tutor', {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Tutors',
        key: 'email',
        as: 'tutor',
      },
    });
    await queryInterface.removeColumn(
      'StudentNotifications',
      'studentName'
    );
    await queryInterface.addColumn(
      'StudentNotifications',
      'student',
      {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Students',
          key: 'email',
          as: 'student',
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TutorStudents', 'tutor');
    await queryInterface.addColumn('TutorStudents', 'tutorName');
    await queryInterface.removeColumn('TutorStudents', 'student');
    await queryInterface.addColumn('TutorStudents', 'studentName');
    await queryInterface.removeColumn(
      'StudentNotifications',
      'tutor'
    );
    await queryInterface.addColumn(
      'StudentNotifications',
      'tutorName'
    );
    await queryInterface.removeColumn(
      'StudentNotifications',
      'student'
    );
    await queryInterface.addColumn(
      'StudentNotifications',
      'studentName'
    );
  },
};
