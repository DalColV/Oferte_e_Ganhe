const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    registration: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'store',
        key: 'store_id',
      },
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profile',
        key: 'profile_id',
      },
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);
// Associações
User.associate = (models) => {
  User.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'profile' });
  User.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });
};

module.exports =  User ;


