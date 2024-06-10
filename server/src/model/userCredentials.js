const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class UserCredentials extends Model { }
UserCredentials.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    current_password: DataTypes.STRING,
    stripe_customer_id: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM,
        values: ['Activo','Inactivo','Suspendido'],
        defaultValue: 'Activo'
    },
    registration_date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'UserCredentials',
    tableName: 'user_credentials',
    timestamps: false
});

module.exports = UserCredentials;