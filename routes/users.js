const express = require('express');
const route = express.Router();
const passport = require('passport');

const registroUsuario = require('../db/userQueries').registroUsuario;
const loginUsuario = require('../db/userQueries').loginUsuario;
const buscarUsuario = require('../db/userQueries').buscarUsuario;

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

module.exports = route;
