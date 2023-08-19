const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const { Strategy } = require("passport-local");
const userServices = require("../../../services/user.services");

const localStrategy = new Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await userServices.listByEmail(email);
      if (!user) {
        done(boom.notFound("Usuario no existe"), false);
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        done(boom.unauthorized("Usuario o contraseña incorrecto"), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
