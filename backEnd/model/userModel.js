const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  registration: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Associações
User.associate = (models) => {
  User.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'profile' });
  User.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });
  User.hasMany(models.TalonLog, { foreignKey: 'registration', as: 'talonLogs' });
};

module.exports = { User };


