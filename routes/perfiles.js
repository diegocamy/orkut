const express = require('express');
const route = express.Router();
const passport = require('passport');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

//cloudinary storage
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'orkut',
  allowedFormats: ['jpg', 'png']
});

const upload = multer({ storage });

const crearPerfil = require('../db/perfilQueries').crearPerfil;
const editarPerfil = require('../db/perfilQueries').editarPerfil;

// RUTA PRIVADA
// metodo: POST
// descripcion: para crear un perfil de usuario
// ruta: /api/perfiles/crearPerfil

route.post(
  '/crearPerfil',
  passport.authenticate('jwt', { session: false }),
  upload.single('foto'),
  crearPerfil
);

// RUTA PRIVADA
// metodo: POST
// descripcion: para editar el perfil de usuario
// ruta: /api/perfiles/editarPerfil

route.post(
  '/editarPerfil',
  passport.authenticate('jwt', { session: false }),
  editarPerfil
);

module.exports = route;
