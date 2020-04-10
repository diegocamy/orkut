const express = require('express');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
require('dotenv').config();

const pool = require('./db/config');

passport.serializeUser((usuario, done) => {
  done(null, usuario);
});

passport.deserializeUser(async (usuario, done) => {
  const user = await (
    await pool.query(`SELECT usuarios.id, email, perfiles.id AS id_perfil
    FROM usuarios 
    LEFT JOIN perfiles 
    ON usuarios.id = perfiles.id_usuario
    WHERE email = '${usuario.email}'`)
  ).rows[0];
  done(null, user);
});

//RUTAS
const usersRoute = require('./routes/users');
const perfilesRoute = require('./routes/perfiles');
const amigosRoute = require('./routes/amigos');

const app = express();

//SESSION CONFIG
const sess = {
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'orkut',
  unset: 'destroy',
  cookie: { secure: false, httpOnly: true, sameSite: true }
};

//middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.get('/api/session', (req, res) => {
  if (req.session) {
    return res.json({ session: req.session });
  }

  return res.send('');
});

app.use('/api/users/', usersRoute);
app.use('/api/perfiles/', perfilesRoute);
app.use('/api/amigos/', amigosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
