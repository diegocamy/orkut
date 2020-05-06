const express = require('express');
const route = express.Router();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//cloudinary storage
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'orkut',
  allowedFormats: ['jpg', 'png'],
});

const upload = multer({ storage });

const authMiddleware = require('../auth/middleware');

const crearPerfil = require('../db/perfilQueries').crearPerfil;
const editarPerfil = require('../db/perfilQueries').editarPerfil;
const cambiarFotoPerfil = require('../db/perfilQueries').cambiarFotoPerfil;
const eliminarFotoPerfil = require('../db/perfilQueries').eliminarFotoPerfil;
const cargarDatosPerfil = require('../db/perfilQueries').cargarDatosPerfil;
const registrarVisita = require('../db/perfilQueries').registrarVisita;
const estadisticasVisitas = require('../db/perfilQueries').estadisticasVisitas;
const proximosCumpleanos = require('../db/perfilQueries').proximosCumpleanos;
const actualizarStatus = require('../db/perfilQueries').actualizarStatus;

// RUTA PRIVADA
// metodo: POST
// descripcion: para crear un perfil de usuario
// ruta: /api/perfiles/crearPerfil

route.post('/crearPerfil', authMiddleware, upload.single('foto'), crearPerfil);

// RUTA PRIVADA
// metodo: POST
// descripcion: para editar el perfil de usuario
// ruta: /api/perfiles/editarPerfil

route.post('/editarPerfil', authMiddleware, editarPerfil);

// RUTA PRIVADA
// metodo: POST
// descripcion: para cambiar la foto del perfil
// ruta: /api/perfiles/cambiarFotoPerfil

route.post(
  '/cambiarFotoPerfil',
  authMiddleware,
  upload.single('foto'),
  cambiarFotoPerfil,
);

// RUTA PRIVADA
// metodo: POST
// descripcion: para eliminar la foto del perfil
// ruta: /api/perfiles/eliminarFotoPerfil

route.post('/eliminarFotoPerfil', authMiddleware, eliminarFotoPerfil);

// RUTA PRIVADA
// metodo: GET
// descripcion: para obtener los datos del perfil
// ruta: /api/perfiles/cargarDatosPerfil

route.post('/cargarDatosPerfil', authMiddleware, cargarDatosPerfil);

// RUTA PRIVADA
// metodo: POST
// descripcion: registrar una visita a un perfil
// ruta: /api/perfiles/registrarVisita/:idUsuarioVisitado

route.post(
  '/registrarVisita/:idUsuarioVisitado',
  authMiddleware,
  registrarVisita,
);

// RUTA PRIVADA
// metodo: GET
// descripcion: registrar una visita a un perfil
// ruta: /api/perfiles/estadisticasVisitas

route.get('/estadisticasVisitas', authMiddleware, estadisticasVisitas);

// RUTA PRIVADA
// metodo: GET
// descripcion: obtener lista de usuarios que cumplen años en los proximos 15 dias
// ruta: /api/perfiles/proximosCumpleanos

route.get('/proximosCumpleanos', authMiddleware, proximosCumpleanos);

// RUTA PRIVADA
// metodo: POST
// descripcion: actualizar el status
// ruta: /api/perfiles/status

route.post('/status', authMiddleware, actualizarStatus);

module.exports = route;
