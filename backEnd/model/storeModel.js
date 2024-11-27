const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'stores',
  timestamps: false,
});

// Associações
Store.associate = (models) => {
  Store.hasMany(models.User, { foreignKey: 'store_id', as: 'users' });
  Store.hasOne(models.Inventory, { foreignKey: 'store_id', as: 'inventory' });
};

module.exports = { Store };
