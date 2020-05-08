const express = require('express');
const route = express.Router();

const authMiddleware = require('../auth/middleware');

const {
  cargarListaTestimoniosAceptados,
  cargarListaTestimoniosPendientes,
  cargarListaTestimoniosEnviados,
  aceptarTestimonio,
  enviarTestimonio,
  rechazarTestimonio,
  eliminarTestimonio,
} = require('../db/testimoniosQueries');

// RUTA PRIVADA
// metodo: GET
// descripcion: cargar lista testimonios aceptados
// ruta: /api/testimonios

route.get('/:idUsuario', authMiddleware, cargarListaTestimoniosAceptados);

// RUTA PRIVADA
// metodo: GET
// descripcion: cargar lista testimonios pendientes
// ruta: /api/testimonios/pendientes

route.get(
  '/pendientes/:idUsuario',
  authMiddleware,
  cargarListaTestimoniosPendientes,
);

// RUTA PRIVADA
// metodo: GET
// descripcion: cargar lista testimonios pendientes
// ruta: /api/testimonios/pendientes

route.get(
  '/enviados/:idUsuario',
  authMiddleware,
  cargarListaTestimoniosEnviados,
);

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar un testimonio
// ruta: /api/testimonios/enviar

route.post('/enviar', authMiddleware, enviarTestimonio);

// RUTA PRIVADA
// metodo: POST
// descripcion: aceptar un testimonio
// ruta: /api/testimonios/aceptar/:idTestimonio

route.post('/aceptar/:idTestimonio', authMiddleware, aceptarTestimonio);

// RUTA PRIVADA
// metodo: POST
// descripcion: rechazar un testimonio
// ruta: /api/testimonios/rechazar/:idTestimonio

route.post('/rechazar/:idTestimonio', authMiddleware, rechazarTestimonio);

// RUTA PRIVADA
// metodo: POST
// descripcion: eliminar un testimonio
// ruta: /api/testimonios/eliminar/:idTestimonio

route.post('/eliminar/:idTestimonio', authMiddleware, eliminarTestimonio);

module.exports = route;
