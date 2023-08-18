const express = require("express");

const character = require("./character.router");
const movie = require("./movie.router");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/characters", character);
  router.use("/movies", movie);
};

module.exports = routerApi;
