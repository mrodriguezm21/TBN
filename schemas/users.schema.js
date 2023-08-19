const Joi = require("joi");

const id = Joi.number().integer();
const password = Joi.string().pattern(/^[a-zA-Z0-9ñÑ]{3,30}$/);
const email = Joi.string().email();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
};
