const pool = require('./config');
const cloudinary = require('cloudinary');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

//crear nuevo perfil
const crearPerfil = async (req, res) => {
  try {
    //verificar si el usuario ya tiene un perfil creado
    const tienePerfil = await (
      await pool.query(`SELECT * FROM perfiles WHERE id_usuario=${req.user.id}`)
    ).rows[0];

    if (tienePerfil) {
      return res.status(200).send('El usuario ya tiene un perfil creado!');
    }

    //verificar datos ingresados
    const perfilSchema = require('../validation/perfilValidation');

    //convertir string a fecha
    const arrFecha = req.body.fechaNacimiento.split('/');
    const fecha = new Date(arrFecha[2], arrFecha[1], arrFecha[0]);

    let datosIngresados = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      fechaNacimiento: fecha,
      pais: req.body.pais,
      ciudad: req.body.ciudad,
      foto: ''
    };

    req.file && (datosIngresados.foto = req.file.secure_url);

    const validado = perfilSchema.validate(datosIngresados);
    if (validado.error) {
      //si hay error en los datos, borrar la imagen de cloudinary si se subió una
      if (req.file) {
        await cloudinary.v2.uploader.destroy(req.file.public_id);
      }
      return res.status(400).send(validado.error.details[0].message);
    }

    datosIngresados = validado.value;

    //crear query con los datos necesarios
    const query = {
      text:
        'INSERT INTO perfiles (nombre, apellido, pais, ciudad, genero, fecha_nacimiento, foto, id_usuario) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      values: [
        datosIngresados.nombre,
        datosIngresados.apellido,
        datosIngresados.pais,
        datosIngresados.ciudad,
        datosIngresados.genero,
        datosIngresados.fechaNacimiento,
        datosIngresados.foto,
        req.user.id
      ]
    };

    //ingresar el nuevo perfil a la base de datos
    const perfil = await pool.query(query);

    return (
      perfil.rowCount === 1 &&
      res.status(200).send('Perfil creado correctamente!')
    );
  } catch (error) {
    return res.json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

//editar perfil
const editarPerfil = async (req, res) => {
  try {
    //cargar datos del perfil del usuario
    let perfil = await (
      await pool.query(
        `SELECT nombre,apellido,pais,genero,ciudad,fecha_nacimiento FROM perfiles WHERE id_usuario='${req.user.id}'`
      )
    ).rows[0];

    //cambiar nomobre del campo fecha_nacimiento a fechaNacimiento
    perfil.fechaNacimiento = perfil.fecha_nacimiento;
    delete perfil.fecha_nacimiento;

    //actualizar valores de perfil por los ingresados
    req.body.nombre && (perfil.nombre = req.body.nombre);
    req.body.apellido && (perfil.apellido = req.body.apellido);
    req.body.genero && (perfil.genero = req.body.genero);
    req.body.pais && (perfil.pais = req.body.pais);
    req.body.ciudad && (perfil.ciudad = req.body.ciudad);
    if (req.body.fechaNacimiento) {
      const arrFecha = req.body.fechaNacimiento.split('/');
      const fecha = new Date(arrFecha[2], arrFecha[1], arrFecha[0]);
      perfil.fechaNacimiento = fecha;
    }

    //validar datos
    const perfilSchema = require('../validation/perfilValidation');
    const validado = perfilSchema.validate(perfil);

    //devolver error si algun dato ingresado no es correcto
    if (validado.error) {
      return res.status(400).send(validado.error.details[0].message);
    }

    //borrar el campo foto
    perfil = validado.value;
    delete perfil.foto;

    //actualizar datos del perfil en la base de datos
    const query = {
      text:
        'UPDATE perfiles SET nombre=$1, apellido=$2, genero=$3, pais=$4, ciudad=$5, fecha_nacimiento=$6 WHERE id_usuario=$7',
      values: [
        perfil.nombre,
        perfil.apellido,
        perfil.genero,
        perfil.pais,
        perfil.ciudad,
        perfil.fechaNacimiento,
        req.user.id
      ]
    };

    await pool.query(query);

    return res.status(200).send('Perfil actualizado!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Algo ha salido mal!', error: error.message });
  }
};

//cambiar foto de perfil
const cambiarFotoPerfil = async (req, res) => {
  try {
    //obtener url de la foto actual desde la base de datos
    const url = await (
      await pool.query(
        `SELECT foto FROM perfiles WHERE id_usuario='${req.user.id}'`
      )
    ).rows[0].foto;

    if (url) {
      //obtener public id desde la url
      const public_id = url.match(/orkut\/\w+/gi);

      //borrar foto de cloudinary
      await cloudinary.v2.uploader.destroy(public_id);
    }

    //url de la nueva foto subida a cloudinary
    const foto = await req.file.secure_url;

    //actualizar la base de datos con la nueva foto
    const query = {
      text: 'UPDATE perfiles SET foto=$1 WHERE id_usuario=$2',
      values: [foto, req.user.id]
    };

    await pool.query(query);

    return res.status(200).send('Foto actualizada con éxito');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

//eliminar foto de perfil
const eliminarFotoPerfil = async (req, res) => {
  try {
    //obtener url de la foto desde la base de datos
    const url = await (
      await pool.query(
        `SELECT foto FROM perfiles WHERE id_usuario='${req.user.id}'`
      )
    ).rows[0].foto;

    //obtener public id desde la url
    const public_id = url.match(/orkut\/\w+/gi);

    //borrar foto de cloudinary
    await cloudinary.v2.uploader.destroy(public_id);

    //borrar foto de la base de datos
    await pool.query(
      `UPDATE perfiles SET foto='' WHERE id_usuario='${req.user.id}'`
    );

    return res.status(200).send('Foto de perfil eliminada con exito!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

module.exports = {
  crearPerfil,
  editarPerfil,
  cambiarFotoPerfil,
  eliminarFotoPerfil
};
