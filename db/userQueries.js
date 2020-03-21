const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config');

//registrar un usuario nuevo
const registroUsuario = async (req, res) => {
  try {
    //verificar datos ingresados
    const usuarioSchema = require('../validation/validation');
    let datosIngresados = {
      email: req.body.email,
      password: req.body.password,
      repeat_password: req.body.repeat_password
    };

    //checkear si las contraseñas son iguales
    if (datosIngresados.password !== datosIngresados.repeat_password) {
      return res.status(400).send('Las contraseñas no coinciden!');
    } else {
      delete datosIngresados.repeat_password;
    }

    //checkear datos ingresados y si hay algun error, notificarlo
    const validado = usuarioSchema.validate(datosIngresados);
    if (validado.error) {
      return res.status(400).send(validado.error.details[0].message);
    }

    //datos ingresados y validados correctamente
    datosIngresados = validado.value;

    //verificar la base de datos para ver si el email esta en uso o no
    let query = {
      text: 'SELECT * FROM usuarios WHERE email=$1',
      values: [datosIngresados.email]
    };

    const respuesta = await (await pool.query(query)).rows;

    //el email ya esta en uso
    if (respuesta.length > 0) {
      return res.status(400).send('El email ya está en uso!');
    }

    //el email no está en uso, proximo paso es hashear la contraseña
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(datosIngresados.password, salt);

    datosIngresados = { ...datosIngresados, password: hashPassword };

    //guardar el nuevo user en la base de datos
    query = {
      text: 'INSERT INTO usuarios (email, password) VALUES($1, $2)',
      values: [datosIngresados.email, datosIngresados.password]
    };

    const userInsertado = await pool.query(query);

    return (
      userInsertado.rowCount === 1 &&
      res.status(200).send('Usuario ingresado con éxito!')
    );
  } catch (error) {
    return res.status(500).json({ mensaje: 'Ha ocurrido un error!', error });
  }
};

//login usuario
const loginUsuario = async (req, res) => {
  try {
    //verificar si existe usuario para el email ingresado
    let query = {
      text: 'SELECT * FROM usuarios WHERE email = $1',
      values: [req.body.email]
    };

    const usuario = await (await pool.query(query)).rows[0];

    //si no existe un usuario para ese email notificar el error
    if (!usuario) {
      return res.status(400).send('Email o contraseña incorrecta!');
    }

    //si existe un usuario, entonces verificar el password ingresado
    const passwordsCoinciden = await bcrypt.compare(
      req.body.password,
      usuario.password
    );

    if (!passwordsCoinciden) {
      return res.status(400).send('Email o contraseña incorrecta!');
    }

    //si se ingresa bien el email y el password, generar json web token
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    //devolver token
    return res.json({ token: 'Bearer ' + token });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Ha ocurrido un error!', error });
  }
};

//buscar usuario por nombre/apellido
const buscarUsuario = async (req, res) => {
  try {
    //separar frase ingresada en array de palabras
    const arrayPalabras = req.body.busqueda.split(' ');

    //por cada palabra crear filtro: 'COLUMNA ILIKE palabra OR COLUMNA ILIKE palabra'
    const arrayFiltros = arrayPalabras.map(
      palabra => `nombre ILIKE '%${palabra}%' OR apellido ILIKE '%${palabra}%'`
    );

    //crear query para buscar por nombre o apellido
    const query =
      'SELECT id_usuario, nombre, apellido, pais, ciudad, foto FROM perfiles WHERE ' +
      arrayFiltros.join(' OR ');

    const perfiles = await (await pool.query(query)).rows;

    return res.send(perfiles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensaje: 'Algo salió mal!', error: error });
  }
};

module.exports = {
  registroUsuario,
  loginUsuario,
  buscarUsuario
};
