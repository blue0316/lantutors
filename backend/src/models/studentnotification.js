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
      notificationId: {
        type: DataTypes.INTEGER,
        references: {
          // model: models.Notification,
          model: 'Notification',
          key: 'id',
          as: 'notificationId',
        },
      },
      studentName: {
        type: DataTypes.STRING,
        references: {
          // model: models.Student,
          model: 'Student',
          key: 'username',
          as: 'studentName',
        },
      },
    },
    {
      sequelize,
      modelName: 'StudentNotification',
    }
  );
  return StudentNotification;
};
