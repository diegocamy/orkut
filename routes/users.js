const express = require('express');
const route = express.Router();

const authMiddleware = require('../auth/middleware');

const registroUsuario = require('../db/userQueries').registroUsuario;
const loginUsuario = require('../db/userQueries').loginUsuario;
const buscarUsuario = require('../db/userQueries').buscarUsuario;
const recuperarPassword = require('../db/userQueries').recuperarPassword;
const cambiarPassword = require('../db/userQueries').cambiarPassword;
const eliminarCuenta = require('../db/userQueries').eliminarCuenta;

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
// metodo: POST
// descripcion: para obtener todos los usuarios
// ruta: /api/users/buscarUsuario

route.post('/buscarUsuario', authMiddleware, buscarUsuario);

// RUTA PRIVADA
// metodo: POST
// descripcion: para cambiar la contraseña
// ruta: /api/users/cambiarPassword

route.post('/cambiarPassword', authMiddleware, cambiarPassword);

// RUTA PUBLICA
// metodo: POST
// descripcion: para recuperar la contraseña
// ruta: /api/users/recuperarPassword

route.post('/recuperarPassword', recuperarPassword);

// RUTA PUBLICA
// metodo: POST
// descripcion: para recuperar la contraseña
// ruta: /api/users/eliminarCuenta

route.post('/eliminarCuenta', authMiddleware, eliminarCuenta);

//RUTA PUBLICA
// metodo: POST
// descripcion: para deslogear un usuario logeado
//ruta: /api/users/logout

route.post('/logout', authMiddleware, async (req, res) => {
  try {
    //borrar la sesion de la bdd
    req.logout();
    await req.session.destroy();

    res.send('Usuario deslogeado');
  } catch (error) {
    res.status(400).json({ mensaje: 'Ha ocurrido un error', error });
  }
});

module.exports = route;
