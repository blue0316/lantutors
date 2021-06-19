'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TutorStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TutorStudent.init(
    {
      tutorName: {
        type: DataTypes.STRING,
        references: {
          // model: models.Tutor,
          model: 'Tutor',
          key: 'username',
          as: 'tutorName',
        },
      },
      studentName: {
        type: DataTypes.STRING,
        references: {
          // model: models.Student,
          model: 'Student',
          key: 'username',
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
