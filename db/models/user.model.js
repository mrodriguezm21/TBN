const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(255),
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
};

class User extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { UserSchema, USER_TABLE, User };
