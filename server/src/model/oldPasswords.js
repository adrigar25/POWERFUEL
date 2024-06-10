const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class OldPasswords extends Model { }
OldPasswords.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserCredentials',
            key: 'user_id'
        }
    },
    old_password: DataTypes.STRING,
    change_date: DataTypes.DATE
}, {
    sequelize,
    modelName: 'OldPasswords',
    tableName: 'old_passwords',
    timestamps: false
});

module.exports = OldPasswords;