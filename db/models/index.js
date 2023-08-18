const { Character, CharacterSchema } = require("./character.model");
const { Movie, MovieSchema } = require("./movie.model");
const { Genre, GenreSchema } = require("./genre.model");

const setUpModels = (sequelize) => {
  Character.init(CharacterSchema, Character.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
};

module.exports = { setUpModels };
