 const { Sequelize, DataTypes } = require('sequelize');
 const sequelize = require('../config/database'); 

 const Store = sequelize.define('Store', {
     store_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
     },
     store_name: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     street: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     cep: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     number: {
         type: DataTypes.STRING,
         allowNull: false,
     }
 }, {
     tableName: 'store',  
     timestamps: false,
 });   

 module.exports = Store;
