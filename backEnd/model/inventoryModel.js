const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Inventory = sequelize.define('Inventory', {
     inventory_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
     },
     store_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
     },
     min_quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
     },
     recommended_quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
     },
     current_quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
     }
 }, {
     tableName: 'inventory', 
     timestamps: false,      
 });

 module.exports = Inventory;
