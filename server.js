const express = require('express');
const passport = require('passport');
require('dotenv').config();

const app = express();

const usersRoute = require('./routes/users');
const perfilesRoute = require('./routes/perfiles');
const amigosRoute = require('./routes/amigos');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./auth/auth')(passport);

//rutas
app.use('/api/users/', usersRoute);
app.use('/api/perfiles/', perfilesRoute);
app.use('/api/amigos/', amigosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
