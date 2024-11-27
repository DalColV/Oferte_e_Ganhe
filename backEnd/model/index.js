const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const { User } = require('../model/userModel');
const { Profile } = require('../model/profileModel');
const { Store } = require('../model/storeModel');
const { TalonLogs } = require('../model/talonModel');
const { Inventory } = require('../model/inventoryModel');

const models = {
  User,
  Profile,
  Store,
  TalonLogs,
  Inventory,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { ...models, sequelize };
