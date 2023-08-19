"use strict";

const { GENRE_TABLE } = require("../models/genre.model");
const genres = require("../../utils/genre.seeders")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(GENRE_TABLE, genres);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(GENRE_TABLE, null, {});
  },
};
