const boom = require("@hapi/boom");

const addCharacter = async (character) => {
//   const { nombre, edad, peso, historia } = character;
//   if (!nombre || !edad || !peso || !historia) {
//     throw boom.badRequest("Missing fields");
//   }
  const newCharacter = { ...character, createdAt: new Date() };

  try {
    return newCharacter;
  } catch (error) {
    throw boom.badImplementation("Unexpected error");
  }
};

const getCharacters = async () => {
  let characters = [
    { nombre: "Pedro", edad: 20, peso: 80, historia: "Historia 1" },
    { nombre: "Juan", edad: 20, peso: 80, historia: "Historia 2" },
    { nombre: "Pablo", edad: 20, peso: 80, historia: "Historia 3" },
  ];
  try {
    return characters;
  } catch (error) {
    throw boom.badImplementation("Unexpected error");
  }
};
const getCharacter = async (id) => {
  let character = {
    nombre: "Pedro",
    edad: 20,
    peso: 80,
    historia: "Historia 1",
  };
  try {
    return character;
  } catch (error) {
    throw boom.notFound("Character not found");
  }
};

const updateSerie = async (id, character) => {
  try {
    return { nombre: "Pedro", edad: 20, peso: 80, historia: "Historia 2" };
  } catch (error) {
    throw boom.notFound("Character not found");
  }
};

const deleteCharacter = async (id) => {
  try {
    return { message: "Character deleted" };
  } catch (error) {
    throw boom.notFound("Character not found");
  }
};

module.exports = {
  create: addCharacter,
  list: getCharacters,
  listOne: getCharacter,
  update: updateSerie,
  delete: deleteCharacter,
};
