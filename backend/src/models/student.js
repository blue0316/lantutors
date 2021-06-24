/**
 * Model: `Student`
 * Class definition of a `Student` model's attributes, fields, associations
 * @see api.controller.registerStudents
 * @see api.validator.registerStudents
 * @see services.RegisterStudents
 * @file defines Student
 */

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
        sourceKey: 'email',
        targetKey: 'email',
        foreignKey: 'student',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Tutor, {
        through: 'StudentNotifications',
        sourceKey: 'email',
        targetKey: 'email',
        foreignKey: 'student',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Student.init(
    {
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
    }
  );
  return Student;
};
