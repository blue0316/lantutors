'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentNotification.init(
    {
      studentName: {
        type: DataTypes.STRING,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'Student',
          key: 'username',
          as: 'studentName',
        },
      },
      tutorName: {
        type: DataTypes.STRING,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'Tutor',
          key: 'username',
          as: 'tutorName',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `[Lantutors] Message from your Tutor`,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `Welcome to Lantutors`,
      },
    },
    {
      sequelize,
      modelName: 'StudentNotification',
    }
  );
  return StudentNotification;
};
