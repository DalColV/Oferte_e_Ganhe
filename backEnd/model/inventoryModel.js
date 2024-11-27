const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inventory_data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'inventories',
  timestamps: false,
});

// Associações
Inventory.associate = (models) => {
  Inventory.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });
  Inventory.hasMany(models.TalonLog, { foreignKey: 'inventory_id', as: 'talonLogs' });
};

module.exports = { Inventory };
