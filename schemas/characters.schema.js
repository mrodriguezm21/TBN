const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(3).max(110);
const age = Joi.number().integer().min(1).max(100);
const weight = Joi.number().min(1).max(300);
const story = Joi.string().min(3).max(255).pattern(/^[\w\s\p{P}]+$/);

const createCharacterSchema = Joi.object({
    name: name.required(),
    age: age.required(),
    weight: weight.required(),
    story: story.required(),
});
// const updateCharacterSchema = Joi.object({
//     id: id.required(),
// });

const getCharacterSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createCharacterSchema, getCharacterSchema
};
