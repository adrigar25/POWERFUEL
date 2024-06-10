const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Notification extends Model {}
Notification.init({
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    notification_date: {
      type: DataTypes.DATE,
    },
    viewed: {
      type: DataTypes.ENUM('1', '0'),
      defaultValue: '0',
    },
    reference: {
      type: DataTypes.STRING(200),
      allowNull: true,
      onDelete: 'CASCADE',
    },
    notification_user: {
      type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.ENUM('Order','Notification'),
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notification',
    timestamps: false
  });

module.exports = Notification;