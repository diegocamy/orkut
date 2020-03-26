const express = require('express');
const route = express.Router();
const passport = require('passport');

const registroUsuario = require('../db/userQueries').registroUsuario;
const loginUsuario = require('../db/userQueries').loginUsuario;
const buscarUsuario = require('../db/userQueries').buscarUsuario;
const recuperarPassword = require('../db/userQueries').recuperarPassword;
const cambiarPassword = require('../db/userQueries').cambiarPassword;

// RUTA PUBLICA
// metodo: POST
// descripcion: para registrar usuario
// ruta: /api/users/register

route.post('/register', registroUsuario);

// RUTA PUBLICA
// metodo: POST
// descripcion: para logear un usuario
// ruta: /api/users/login

route.post('/login', loginUsuario);

// RUTA PRIVADA
// metodo: GET
// descripcion: para obtener todos los usuarios
// ruta: /api/users/todos

route.get(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  buscarUsuario
);

// RUTA PRIVADA
// metodo: POST
// descripcion: para cambiar la contraseña
// ruta: /api/users/cambiarPassword

route.post(
  '/cambiarPassword',
  passport.authenticate('jwt', { session: false }),
  cambiarPassword
);

// RUTA PUBLICA
// metodo: POST
// descripcion: para recuperar la contraseña
// ruta: /api/users/recuperarPassword

route.post('/recuperarPassword', recuperarPassword);

module.exports = route;
