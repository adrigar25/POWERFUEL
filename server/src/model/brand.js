const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Brand extends Model { }
Brand.init({
    id_brand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand_name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: false
});

module.exports = Brand;