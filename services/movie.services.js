const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");

const addMovie = async (data) => {
  const newMovie = await models.Movie.create(data);
  if (!newMovie) {
    throw boom.badImplementation("Error creating Movie");
  }
  return newMovie;
};
const getMovies = async (filter) => {
  const whereClause = {};

  if (filter.name) {
    whereClause.title = { [Op.like]: `%${filter.name}%` };
  }
  const attributes = ["id", "image", "title", "releaseYear"];
  const movies = await models.Movie.findAll({
    where: whereClause,
    attributes: attributes,
  });
  return movies;
};
const getMovie = async (id) => {
  const attributesToExclude = ["created_at", "updated_at", "deleted_at"];
  const movie = await models.Movie.findByPk(id, {
    attributes: { exclude: attributesToExclude },
  });
  if (!movie) {
    throw boom.notFound("Movie not found");
  }
  return movie;
};

const updateMovie = async (id, changes) => {
  const movie = await models.Movie.findByPk(id);
  if (!movie) {
    throw boom.notFound("Movie not found");
  }
  const updatedMovie = await movie.update(changes);
  return updatedMovie;
};

const deleteMovie = async (id) => {
  const movie = await models.Movie.findByPk(id);
  if (!movie) {
    throw boom.notFound("Movie not found");
  }
  await movie.destroy();
  return { message: "Movie deleted" };
};

module.exports = {
  create: addMovie,
  list: getMovies,
  listOne: getMovie,
  update: updateMovie,
  delete: deleteMovie,
};
