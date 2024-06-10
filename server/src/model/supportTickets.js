const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class SupportTicket extends Model { }
SupportTicket.init({
    ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Problema de Pago', 'Problema de Envío', 'Producto Dañado', 'Producto Incorrecto', 'Consulta de Producto', 'Solicitud de Reembolso', 'Problema de Inicio de Sesión', 'Problema de Cuenta', 'Otro'),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'SupportTicket',
    tableName: 'support_tickets',
    timestamps: false
});

module.exports = SupportTicket;