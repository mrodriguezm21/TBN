'use strict';

const { CHARACTER_TABLE, CharacterSchema} = require('../models/character.model');
// const { MOVIE_CHARACTER_TABLE, MovieCharacterSchema} = require('../models/movie-character');
const {MOVIE_TABLE, MovieSchema} = require('../models/movie.model');
const {GENRE_TABLE, GenreSchema} = require('../models/genre.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(GENRE_TABLE, GenreSchema);
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
    await queryInterface.createTable(CHARACTER_TABLE, CharacterSchema);
    // await queryInterface.createTable(MOVIE_CHARACTER_TABLE, MovieCharacterSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CHARACTER_TABLE);
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(GENRE_TABLE); 
    // await queryInterface.dropTable(MOVIE_CHARACTER_TABLE);
  }
};
