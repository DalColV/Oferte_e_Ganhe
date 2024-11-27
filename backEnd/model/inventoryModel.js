const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define(
  'Inventory',
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'store',
        key: 'store_id',
      },
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
    },
  },
  {
    tableName: 'inventory',
    timestamps: false,
  }
);
// Associações
Inventory.associate = (models) => {
  Inventory.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });
  Inventory.hasMany(models.TalonLog, { foreignKey: 'inventory_id', as: 'talonLogs' });
};

module.exports =  Inventory ;
