// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); 

// const Profile = sequelize.define('Profile', {
//     profile_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true, 
//         allowNull: false,
//     },
//     profile_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     has_profile_management: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_user_management: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_inventory_management: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_maintenance: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_store_management: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_shipping: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     has_receiving: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     }
// }, {
//     tableName: 'profile',  
//     timestamps: false,     
// });

// module.exports = Profile;
