const config = require("../config");

const USER = encodeURIComponent(config.db_username);
const PASSWORD = encodeURIComponent(config.db_password);


const URI = `mariadb://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

module.exports = {
  development: {
    url: URI,
    dialect: "mariadb",
  },
  production: {
    url: URI,
    dialect: "mariadb",
  },
};
