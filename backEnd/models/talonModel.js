const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TalonLogs = sequelize.define(
  'TalonLogs',
  {
    talon_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shipment: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'inventory',
        key: 'inventory_id',
      },
    },
    talon_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    talon_status: {
      type: DataTypes.ENUM('Sent', 'Received', 'Misplaced'),
      allowNull: false,
    },
    receive_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    registration: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'users',
        key: 'registration',
      },
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'store',
        key: 'store_id'
      }
    },
  },
  {
    tableName: 'talon_logs',
    timestamps: false,
  }
);

TalonLogs.associate = (models) => {
  TalonLogs.belongsTo(models.Inventory, { foreignKey: 'inventory_id', as: 'inventory' });
  TalonLogs.belongsTo(models.User, { foreignKey: 'registration', as: 'user' });
  TalonLogs.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });

};

module.exports = TalonLogs;
