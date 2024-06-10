const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Role extends Model { }
Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;