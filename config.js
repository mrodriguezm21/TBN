const config = {
  port: process.env.PORT || 3005,
  host: process.env.HOST || "http://localhost",
  db_username: process.env.DB_USERNAME || "root",
  db_password: process.env.DB_PASSWORD || "root",
  db_name: process.env.DB_NAME || "TBNMovies",
  db_port: process.env.DB_PORT || "3306",
  db_host: process.env.DB_HOST || "localhost",
};

module.exports = config;
