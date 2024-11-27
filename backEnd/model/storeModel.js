const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define(
  'Store',
  {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    store_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_matriz: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: 'store',
    timestamps: false,
  }
);

// Associações
Store.associate = (models) => {
  Store.hasMany(models.User, { foreignKey: 'store_id', as: 'users' });
  Store.hasOne(models.Inventory, { foreignKey: 'store_id', as: 'inventory' });
};

module.exports = { Store };
