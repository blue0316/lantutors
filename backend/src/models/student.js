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
      this.belongsToMany(models.Tutor, {
        through: 'StudentNotifications',
        sourceKey: 'username',
        targetKey: 'username',
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
          validateEmail(email, next) {
            const re = /\S+@\S+\.\S+/;
            if (re.test(email)) {
              return next();
            } else {
              return next('Email is invalid');
            }
          },
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
      hooks: {
        afterCreate: async (student, options) => {
          student.username = await student.email.split('@')[0];
        },
        beforeUpdate: async () => {
          if (student.changed('username')) {
            student.username = await student.email.split('@')[0];
          }
        },
      },
    }
  );
  return Student;
};
