const config = require("../config");

const { Sequelize } = require("sequelize");
const { setUpModels } = require("../db/models/index");

const USER = encodeURIComponent(config.db_username);
const PASSWORD = encodeURIComponent(config.db_password);
const URI = `mariadb://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/prueba122`;

const db = new Sequelize(URI, {
  dialect: "mariadb",
  logging: console.log,
});

setUpModels(db);

db.sync({ alter: true, force: true }).then(() => {});

module.exports = db;
