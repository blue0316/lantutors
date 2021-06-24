/**
 * Model: `TutorStudent`
 * Explicit definition of `TutorStudent` many-to-many `through` table
 * for `Tutor` and `Student` associations
 * @see api.controller.registerStudents
 * @see api.validator.registerStudents
 * @see services.RegisterStudents
 * @file defines TutorStudent
 */

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TutorStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TutorStudent.init(
    {
      tutor: {
        type: DataTypes.STRING,
        references: {
          model: 'Tutors',
          key: 'email',
          as: 'tutor',
        },
      },
      student: {
        type: DataTypes.STRING,
        references: {
          model: 'Students',
          key: 'email',
          as: 'student',
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'TutorStudent',
    }
  );
  return TutorStudent;
};
