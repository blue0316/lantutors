'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tutor, {
        through: 'TutorStudents',
        sourceKey: 'username',
        targetKey: 'username',
        foreignKey: 'studentName',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Notification, {
        through: 'StudentNotifications',
        sourceKey: 'username',
        foreignKey: 'studentName',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Student.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );
  return Student;
};
