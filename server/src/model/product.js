const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Product extends Model { }
Product.init({
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock_quantity: DataTypes.INTEGER,
    id_brand: {
        type: DataTypes.INTEGER,
        references: { model: 'Brand', key: 'id_brand' }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Category', key: 'category_id' }
    },
    status: {
        type: DataTypes.ENUM('Enabled', 'Disabled'),
        defaultValue: 'Disabled'
    },
    stripe_product_id: { 
        type: DataTypes.STRING,
    },
    stripe_price_id: {
        type: DataTypes.STRING,
    },
    registration_date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

module.exports = Product;