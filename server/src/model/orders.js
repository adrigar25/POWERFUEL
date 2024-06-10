const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Order extends Model { }
Order.init({
    order_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserCredentials',
            key: 'user_id',
            onDelete: 'CASCADE'
        }
    },
    order_date: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM('pendiente','en proceso','enviado','entregado','cancelado','devuelto','fallido','en proceso de devolucion'),
        defaultValue: 'pendiente'
    },
    details: DataTypes.STRING,
    shipping_address: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;