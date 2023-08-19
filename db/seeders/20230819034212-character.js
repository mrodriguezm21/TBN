"use strict";

const { CHARACTER_TABLE } = require("../models/character.model");
const characters = require("../../utils/db/character.seeders");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(CHARACTER_TABLE, characters);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(CHARACTER_TABLE, null, {});
  },
};
