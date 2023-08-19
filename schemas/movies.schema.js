const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string().alphanum().min(3).max(110).pattern(/^[\w\s\p{P}]+$/);
const releaseYear = Joi.number().integer().min(1895).max(3000);
const rating = Joi.number().min(1).max(5);
const genreId = Joi.number().integer();

const createMovieSchema = Joi.object({
  title: title.required(),
  releaseYear: releaseYear.required(),
  rating: rating.required(),
  genreId: genreId.required(),
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMovieSchema,
  getMovieSchema,
};
