const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(3).max(110).pattern(/^[\w\s\p{P}]+$/);
const age = Joi.number().integer().min(1).max(100);
const weight = Joi.number().min(1).max(300);
const story = Joi.string().min(3).max(255).pattern(/^[\w\s\p{P}]+$/);
const movieId = Joi.number().integer();

const createCharacterSchema = Joi.object({
    name: name.required(),
    age: age.required(),
    weight: weight.required(),
    story: story.required(),
    movieId: movieId.required(),
});

const getCharacterSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createCharacterSchema, getCharacterSchema
};
