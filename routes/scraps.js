const express = require('express');
const route = express.Router();

const authMiddleware = require('../auth/middleware');

const enviarScrap = require('../db/scrapsQueries').enviarScrap;
const cargarScraps = require('../db/scrapsQueries').cargarScraps;
const eliminarScrap = require('../db/scrapsQueries').eliminarScrap;

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar una solicitud de amistad
// ruta: /api/scraps/enviarScrap/:idUsuarioReceptor

route.post('/enviarScrap/:idUsuarioReceptor', authMiddleware, enviarScrap);

// RUTA PRIVADA
// metodo: GET
// descripcion: enviar una solicitud de amistad
// ruta: /api/scraps/cargarScraps/:idUsuario

route.get('/cargarScraps/:idUsuario', authMiddleware, cargarScraps);

// RUTA PRIVADA
// metodo: POST
// descripcion: enviar una solicitud de amistad
// ruta: /api/scraps/eliminarScrap/:idScrap

route.post('/eliminarScrap/:idScrap', authMiddleware, eliminarScrap);

module.exports = route;
