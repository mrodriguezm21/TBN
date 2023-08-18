const { Model, DataTypes, Sequelize } = require("sequelize");

const MOVIE_TABLE = "movies";

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING(255),
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  releaseYear: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "release_year",
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class Movie extends Model {
  static associate(models) {
    // define association here
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: "Movie",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    };
  }
}

module.exports = { MovieSchema, MOVIE_TABLE, Movie };
