const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");

const addCharacter = async (data) => {
  const newCharacter = await models.Character.create(data);
  if (!newCharacter) {
    throw boom.badImplementation("Error creating character");
  }
  return newCharacter;
};
const getCharacters = async (filter) => {
  const whereClause = {};

  if (filter.age) {
    whereClause.age = filter.age;
  }
  if (filter.name) {
    whereClause.name = { [Op.like]: `%${filter.name}%` };
  }
  if (filter.movies) {
    whereClause.movieId = filter.movies;
  }

  const attributes = ["id", "name", "image"];
  const characters = await models.Character.findAll({
    where: whereClause,
    attributes: attributes,
  });

  return characters;
};
const getCharacter = async (id) => {
  const attributesToExclude = ["createdAt", "updatedAt", "deletedAt"];
  const character = await models.Character.findByPk(id, {
    attributes: { exclude: attributesToExclude },
    include: { association: "movie", attributes: ["id", "title"] },
  });
  if (!character) {
    throw boom.notFound("Character not found");
  }
  return character;
};

const updateCharacter = async (id, changes) => {
  const character = await models.Character.findByPk(id);
  if (!character) {
    throw boom.notFound("Character not found");
  }
  const updatedCharacter = await character.update(changes);
  return updatedCharacter;
};

const deleteCharacter = async (id) => {
  const character = await models.Character.findByPk(id);
  if (!character) {
    throw boom.notFound("Character not found");
  }
  await character.destroy();
  return { message: "Character deleted" };
};

module.exports = {
  create: addCharacter,
  list: getCharacters,
  listOne: getCharacter,
  update: updateCharacter,
  delete: deleteCharacter,
};
