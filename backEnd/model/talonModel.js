const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TalonLog = sequelize.define('TalonLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registration: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  log_data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'talon_logs',
  timestamps: false,
});

// Associações
TalonLog.associate = (models) => {
  TalonLog.belongsTo(models.Inventory, { foreignKey: 'inventory_id', as: 'inventory' });
  TalonLog.belongsTo(models.User, { foreignKey: 'registration', as: 'user' });
};

module.exports = { TalonLog };
