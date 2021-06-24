/**
 * Model: `Tutor`
 * Class definition of a `Tutor` model's attributes, fields, associations
 * @see api.controller.registerTutor
 * @see api.validator.registerTutor
 * @see services.RegisterTutor
 * @file defines Tutor
 */

import { genSalt, hash } from 'bcryptjs';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Student, {
        through: 'StudentNotifications',
        sourceKey: 'email',
        targetKey: 'email',
        foreignKey: 'tutor',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Student, {
        through: 'TutorStudents',
        sourceKey: 'email',
        targetKey: 'email',
        foreignKey: 'tutor',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Tutor.init(
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
      password: {
        type: DataTypes.STRING,
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
        beforeUpdate: async (tutor, options) => {
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
