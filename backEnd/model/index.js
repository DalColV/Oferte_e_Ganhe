// index.js (geralmente no diretório 'model')
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importando os modelos
const { User } = require('../model/userModel');
const { Profile } = require('../model/profileModel');
const { Store } = require('../model/storeModel');
const { TalonLog } = require('../model/talonModel');
const { Inventory } = require('../model/inventoryModel');

// Definindo os modelos
const models = {
  User,
  Profile,
  Store,
  TalonLog,
  Inventory,
};

// Aplicando as associações entre os modelos
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exportando os modelos e o Sequelize
module.exports = { ...models, sequelize };
