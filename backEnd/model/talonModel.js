// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const TalonLog = sequelize.define('TalonLog', {
//     talon_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     inventory_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     shipment: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     talon_quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     send_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     order_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     talon_status: {
//         type: DataTypes.ENUM('Sent', 'Received', 'Misplaced'), 
//         allowNull: false,
//     },
//     receive_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     registration: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// }, {
//     tableName: 'talon_logs',
//     timestamps: false, 
// });

// module.exports = TalonLog;
