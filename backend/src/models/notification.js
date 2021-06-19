'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tutor, {
        targetKey: 'username',
        foreignKey: 'tutorName',
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Student, {
        through: 'StudentNotifications',
        targetKey: 'username',
        foreignKey: 'studentName',
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      tutorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};
