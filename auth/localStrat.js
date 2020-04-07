const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db/config');

const strat = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const usuario = await (
        await pool.query(`SELECT usuarios.id AS id, email, password, perfiles.id AS id_perfil
      FROM usuarios 
      LEFT JOIN perfiles 
      ON usuarios.id = perfiles.id_usuario 
      WHERE email='${email}'`)
      ).rows[0];

      if (!usuario) {
        return done(null, false);
      }

      const passwordsIguales = await bcrypt.compare(password, usuario.password);

      if (!passwordsIguales) {
        return done(null, false);
      }

      delete usuario.password;

      return done(null, usuario);
    } catch (error) {
      console.log('fiadaputa', error);
      return done(error);
    }
  }
);

module.exports = strat;
