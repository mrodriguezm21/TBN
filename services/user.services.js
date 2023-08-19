const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");

const addUser = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await models.User.create({
    ...data,
    password: hashedPassword,
  });
  if (!newUser) {
    throw boom.badImplementation("Error creating user");
  }
  delete newUser.dataValues.password;
  return newUser;
};
const getUserByEmail = async (email) => {
  const users = await models.User.findOne({
    where: { email },
  });
  return users;
};
const getUser = async (id) => {
  const attributesToExclude = ["createdAt", "updatedAt", "deletedAt"];
  const user = await models.User.findByPk(id, {
    attributes: { exclude: attributesToExclude },
  });
  if (!user) {
    throw boom.notFound("User not found");
  }
  return user;
};

module.exports = {
  create: addUser,
  listByEmail: getUserByEmail,
  listOne: getUser,
};
