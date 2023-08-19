const { Character, CharacterSchema } = require("./character.model");
const { Movie, MovieSchema } = require("./movie.model");
const { Genre, GenreSchema } = require("./genre.model");
const { User, UserSchema } = require("./user.model");
// const { MovieCharacter, MovieCharacterSchema } = require("./movie-character");

const setUpModels = (sequelize) => {
  Character.init(CharacterSchema, Character.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  // MovieCharacter.init(MovieCharacterSchema, MovieCharacter.config(sequelize));

  Character.associate(sequelize.models);
  Movie.associate(sequelize.models);
  Genre.associate(sequelize.models);
  // MovieCharacter.associate(sequelize.models);
};

module.exports = { setUpModels };
