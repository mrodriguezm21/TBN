const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../../../config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStrategy;
