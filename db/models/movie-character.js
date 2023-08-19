const { Model, DataTypes } = require("sequelize");
const { MOVIE_TABLE } = require("./movie.model");
const { CHARACTER_TABLE } = require("./character.model");

const MOVIE_CHARACTER_TABLE = "movies_has_characters";

const MovieCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  movieId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: "id",
    },
    field: "movie_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  charactherId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CHARACTER_TABLE,
      key: "id",
    },
    field: "character_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class MovieCharacter extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: "MovieCharacter",
      timestamps: false,
    };
  }
}

module.exports = {
  MovieCharacterSchema,
  MOVIE_CHARACTER_TABLE,
  MovieCharacter,
};
