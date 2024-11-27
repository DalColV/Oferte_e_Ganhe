const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
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
  tableName: 'profiles',
  timestamps: false,
});

// Associações
Profile.associate = (models) => {
  Profile.hasMany(models.User, { foreignKey: 'profile_id', as: 'users' });
};

module.exports = { Profile };
