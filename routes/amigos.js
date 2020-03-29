const express = require('express');
const route = express.Router();
const passport = require('passport');

const enviarSolicitud = require('../db/amigosQueries').enviarSolicitud;
const aceptarSolicitud = require('../db/amigosQueries').aceptarSolicitud;
const rechazarSolicitud = require('../db/amigosQueries').rechazarSolicitud;
const eliminarAmigo = require('../db/amigosQueries').eliminarAmigo;
const verListaAmigos = require('../db/amigosQueries').verListaAmigos;
const verSolicitudesPendientes = require('../db/amigosQueries')
  .verSolicitudesPendientes;

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar una solicitud de amistad
// ruta: /api/amigos/enviarSolicitud/:idUsuario2

route.post(
  '/enviarSolicitud/:idUsuario2',
  passport.authenticate('jwt', { session: false }),
  enviarSolicitud
);

// RUTA PRIVADA
// metodo: POST
// descripcion: aceptar una solicitud de amistad
// ruta: /api/amigos/aceptarSolicitud/:id

route.post(
  '/aceptarSolicitud/:idSolicitud',
  passport.authenticate('jwt', { session: false }),
  aceptarSolicitud
);

// RUTA PRIVADA
// metodo: POST
// descripcion: rechazar una solicitud de amistad
// ruta: /api/amigos/rechazarSolicitud/:id

route.post(
  '/rechazarSolicitud/:idSolicitud',
  passport.authenticate('jwt', { session: false }),
  rechazarSolicitud
);

// RUTA PRIVADA
// metodo: POST
// descripcion: eliminar a un amigo
// ruta: /api/amigos/eliminarAmigo/:idUsuario2

route.post(
  '/eliminarAmigo/:idAmigo',
  passport.authenticate('jwt', { session: false }),
  eliminarAmigo
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

// RUTA PRIVADA
// metodo: GET
// descripcion: ver lista de amigos
// ruta: /api/amigos/verListaAmigos

route.get(
  '/verListaAmigos',
  passport.authenticate('jwt', { session: false }),
  verListaAmigos
);

module.exports = route;
