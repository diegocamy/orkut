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

module.exports = {
  crearPerfil
};
