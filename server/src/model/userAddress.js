const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class UserAddress extends Model { }
UserAddress.init({
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserCredentials',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    is_default: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Address',
    tableName: 'user_address',
    timestamps: false
});

module.exports = UserAddress;