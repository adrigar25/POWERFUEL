const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class UserRoles extends Model { }
UserRoles.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'UserCredentials', key: 'user_id' }
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 10,
        references: { model: 'Role', key: 'role_id' }
    },
}, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false
});

module.exports = UserRoles;