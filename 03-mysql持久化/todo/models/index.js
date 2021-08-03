'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const {
  database,
  username,
  password,
  ...rest
} = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(database, username, password, {
  ...rest
});

console.log(__dirname);
fs.readdirSync(__dirname)
  .filter(file => {
    return file.includes('.') && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    console.log(model.name, '------model');
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
