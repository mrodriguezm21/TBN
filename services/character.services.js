const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

const addCharacter = async (data) => {
  const newCharacter = await models.Character.create(data);
  if (!newCharacter) {
    throw boom.badImplementation("Error creating character");
  }
  return newCharacter;
};
const getCharacters = async () => {
  const characters = await models.Character.findAll();
  return characters;
};
const getCharacter = async (id) => {
  const character = await models.Character.findByPk(id);
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
