module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'TutorStudents', // table name
        'tutorName', // new field name
        {
          type: Sequelize.STRING,
          references: {
            model: 'Tutors',
            key: 'username',
            as: 'tutorName',
          },
        }
      ),
      queryInterface.addColumn(
        'TutorStudents', // table name
        'studentName', // new field name
        {
          type: Sequelize.STRING,
          references: {
            model: 'Students',
            key: 'username',
            as: 'studentName',
          },
        }
      ),
      queryInterface.changeColumn(
        'TutorStudents', // table name
        'active', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('TutorStudents', 'tutoeName'),
      queryInterface.removeColumn('TutorStudents', 'studentName'),
      queryInterface.changeColumn('TutorStudents', 'tutorId'),
      queryInterface.changeColumn('Students', 'suspended', {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },
};
