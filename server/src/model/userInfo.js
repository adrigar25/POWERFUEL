const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class UserInfo extends Model { }
UserInfo.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'UserCredentials',
            key: 'user_id'
        }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dni: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'UserInfo',
    tableName: 'user_info',
    timestamps: false
});

module.exports = UserInfo;