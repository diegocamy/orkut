const express = require('express');
const route = express.Router();

const authMiddleware = require('../auth/middleware');

const enviarSolicitud = require('../db/amigosQueries').enviarSolicitud;
const aceptarSolicitud = require('../db/amigosQueries').aceptarSolicitud;
const rechazarSolicitud = require('../db/amigosQueries').rechazarSolicitud;
const eliminarAmigo = require('../db/amigosQueries').eliminarAmigo;
const verListaAmigos = require('../db/amigosQueries').verListaAmigos;
const verSolicitudesPendientes = require('../db/amigosQueries')
  .verSolicitudesPendientes;
const verSolicitudesEnviadasPendientes = require('../db/amigosQueries')
  .verSolicitudesEnviadasPendientes;

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar una solicitud de amistad
// ruta: /api/amigos/enviarSolicitud/:idUsuario2

route.post('/enviarSolicitud/:idUsuario2', authMiddleware, enviarSolicitud);

// RUTA PRIVADA
// metodo: POST
// descripcion: aceptar una solicitud de amistad
// ruta: /api/amigos/aceptarSolicitud/:id

route.post('/aceptarSolicitud/:idSolicitud', authMiddleware, aceptarSolicitud);

// RUTA PRIVADA
// metodo: POST
// descripcion: rechazar una solicitud de amistad
// ruta: /api/amigos/rechazarSolicitud/:id

route.post(
  '/rechazarSolicitud/:idSolicitud',
  authMiddleware,
  rechazarSolicitud,
);

// RUTA PRIVADA
// metodo: POST
// descripcion: eliminar a un amigo
// ruta: /api/amigos/eliminarAmigo/:idUsuario2

route.post('/eliminarAmigo/:idAmigo', authMiddleware, eliminarAmigo);

// RUTA PRIVADA
// metodo: GET
// descripcion: ver solicitudes pendientes
// ruta: /api/amigos/verSolicitudesPendientes

route.get(
  '/verSolicitudesPendientes',
  authMiddleware,
  verSolicitudesPendientes,
);

// RUTA PRIVADA
// metodo: GET
// descripcion: ver solicitudes pendientes
// ruta: /api/amigos/verSolicitudesEnviadasPendientes

route.get(
  '/verSolicitudesEnviadasPendientes',
  authMiddleware,
  verSolicitudesEnviadasPendientes,
);

// RUTA PRIVADA
// metodo: GET
// descripcion: ver lista de amigos
// ruta: /api/amigos/verListaAmigos

route.post('/verListaAmigos', authMiddleware, verListaAmigos);

module.exports = route;
