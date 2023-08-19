const { Model, DataTypes, Sequelize } = require("sequelize");
const { GENRE_TABLE } = require("./genre.model");



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
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "updated_at",
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "deleted_at",
  },
  genreId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENRE_TABLE,
      key: "id",
    },
    field: "genre_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },


};

class Movie extends Model {
  static associate(models) {
    this.hasMany(models.Character, {as : "characters", foreignKey: "movieId"});
    this.belongsTo(models.Genre, { as: "genre" });

    // this.belongsToMany(models.Character, {
    //   through: models.MovieCharacter,
    //   foreignKey: 'movieId',
    // });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: "Movie",
      timestamps: true,
      paranoid: true,
    };
  }
}

module.exports = { MovieSchema, MOVIE_TABLE, Movie };
