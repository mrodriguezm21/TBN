'use strict';
const { MOVIE_TABLE } = require("../models/movie.model");
const movies = require("../../utils/movie.seeders")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(MOVIE_TABLE, movies);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(MOVIE_TABLE, null, {});
  }
};
