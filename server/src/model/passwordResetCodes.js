const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class PasswordResetCode extends Model { }
PasswordResetCode.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    used: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        defaultValue: '0'
    }
}, {
    sequelize,
    modelName: 'PasswordResetCode',
    tableName: 'password_reset_codes',
    timestamps: false
});

module.exports = PasswordResetCode;
