const express = require('express');
const route = express.Router();
const passport = require('passport');

const enviarSolicitud = require('../db/amigosQueries').enviarSolicitud;
const verSolicitudesPendientes = require('../db/amigosQueries')
  .verSolicitudesPendientes;

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar una solicitud de amistad
// ruta: /api/amigos/enviarSolicitud

route.post(
  '/enviarSolicitud/:id',
  passport.authenticate('jwt', { session: false }),
  enviarSolicitud
);

// RUTA PRIVADA
// metodo: GET
// descripcion: ver solicitudes pendientes
// ruta: /api/amigos/verSolicitudesPendientes

route.get(
  '/verSolicitudesPendientes',
  passport.authenticate('jwt', { session: false }),
  verSolicitudesPendientes
);

module.exports = route;
