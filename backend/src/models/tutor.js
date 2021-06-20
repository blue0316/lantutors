'use strict';
import { compareSync, genSalt, hash } from 'bcryptjs';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Student, {
        through: 'StudentNotifications',
        sourceKey: 'username',
        targetKey: 'username',
        foreignKey: 'tutorName',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Student, {
        through: 'TutorStudents',
        sourceKey: 'username',
        targetKey: 'username',
        foreignKey: 'tutorName',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
    }
    checkPassword(encodedPassword, password) {
      return compareSync(password, encodedPassword);
    }
  }
  Tutor.init(
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
      password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Tutor',
      hooks: {
        beforeCreate: async (tutor, options) => {
          const salt = await genSalt();
          tutor.password = await hash(tutor.password, salt);
        },
        afterCreate: async (tutor, options) => {
          tutor.username = await tutor.email.split('@')[0];
        },
        beforeUpdate: async () => {
          if (tutor.changed('password')) {
            const salt = await genSalt();
            tutor.password = await hash(tutor.password, salt);
          }
        },
      },
    }
  );
  return Tutor;
};
