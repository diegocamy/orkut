const express = require('express');
const passport = require('passport');
require('dotenv').config();

const app = express();

const usersRoute = require('./routes/users');
const perfilesRoute = require('./routes/perfiles');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./auth/auth')(passport);

//rutas
app.use('/api/users/', usersRoute);
app.use('/api/perfiles/', perfilesRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
