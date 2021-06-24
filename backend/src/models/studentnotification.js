/**
 * Model: `StudentNotification`
 * Explicit definition of `StudentNotification` many-to-many `through` table
 * for `Tutor` and `Student` associations issued by a tutor's message
 * @see api.controller.retrieveNotifications
 * @see api.validator.retrieveNotifications
 * @see services.RetrieveNotifications
 * @file defines StudentNotification
 */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  StudentNotification.init(
    {
      student: {
        type: DataTypes.STRING,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'Students',
          key: 'email',
          as: 'student',
        },
      },
      tutor: {
        type: DataTypes.STRING,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'Tutors',
          key: 'email',
          as: 'tutor',
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
