const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define(
  'Profile',
  {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    has_profile_management: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_user_management: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_inventory_management: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_maintenance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_store_management: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_shipping: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_receiving: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'profile',
    timestamps: false,
  }
);

Profile.associate = (models) => {
  Profile.hasMany(models.User, { foreignKey: 'profile_id', as: 'users' });
};

module.exports = {Profile};
