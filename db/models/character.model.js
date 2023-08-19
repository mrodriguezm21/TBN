const { Model, DataTypes } = require("sequelize");
const { MOVIE_TABLE } = require("./movie.model");

const CHARACTER_TABLE = "characters";

const CharacterSchema = {
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
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  weight: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  story: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING(255),
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
};

class Character extends Model {
  static associate(models) {
    this.belongsTo(models.Movie, { as: "movie" });

    // this.belongsToMany(models.Movie, {
    //   as: "actors",
    //   through: models.MovieCharacter,
    //   foreignKey: "characterId",
    //   otherKey: "movieId",
    // })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: "Character",
      timestamps: true,
      paranoid: true,
    };
  }
}

module.exports = { CharacterSchema, CHARACTER_TABLE, Character };
