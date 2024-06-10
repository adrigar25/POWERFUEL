const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Category extends Model { }
Category.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: DataTypes.STRING,
    parent_category_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Category', key: 'category_id' }
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
});

module.exports = Category;