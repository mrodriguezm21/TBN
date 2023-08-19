const { Model, DataTypes, Sequelize, Op } = require("sequelize");

const GENRE_TABLE = "genres";

const GenreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(110),
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING(255),
  },
};

class Genre extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {as : "movies", foreignKey: "genreId"});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: "Genre",
      timestamps: false,
    };
  }
}

module.exports = { GenreSchema, GENRE_TABLE, Genre };
