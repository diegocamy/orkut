const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('../db/userQueries').pool;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const usuario = await (
      await pool.query(`SELECT * FROM usuarios WHERE id=${payload.id}`)
    ).rows[0];

    if (usuario) {
      return done(null, usuario);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, null);
  }
});

module.exports = passport => {
  passport.use(strategy);
};
