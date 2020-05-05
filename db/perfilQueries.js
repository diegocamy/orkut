const pool = require('./config');
const cloudinary = require('cloudinary');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//crear nuevo perfil
const crearPerfil = async (req, res) => {
  try {
    //verificar si el usuario ya tiene un perfil creado
    const tienePerfil = await (
      await pool.query(`SELECT * FROM perfiles WHERE id_usuario=${req.user.id}`)
    ).rows[0];

    if (tienePerfil) {
      return res.status(400).send('El usuario ya tiene un perfil creado!');
    }

    //verificar datos ingresados
    const perfilSchema = require('../validation/perfilValidation');

    //convertir string a fecha
    const arrFecha = req.body.fechaNacimiento.split('-');
    const fecha = new Date(arrFecha[2], arrFecha[1], arrFecha[0]);

    let datosIngresados = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      fechaNacimiento: fecha,
      pais: req.body.pais,
      ciudad: req.body.ciudad,
      foto: '',
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
        req.user.id,
      ],
    };

    //ingresar el nuevo perfil a la base de datos
    const perfil = await pool.query(query);

    //obtener id de perfil
    const id_perfil = await (
      await pool.query(
        `SELECT id FROM perfiles WHERE id_usuario='${req.user.id}'`,
      )
    ).rows[0];

    req.session.passport.user.id_perfil = id_perfil.id;
    req.session.save();

    return res.status(200).json({
      id: req.user.id,
      email: req.user.email,
      id_perfil: id_perfil.id,
    });
  } catch (error) {
    return res.json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

//cargar datos perfil
const cargarDatosPerfil = async (req, res) => {
  try {
    const perfil = await (
      await pool.query(
        `SELECT * FROM perfiles WHERE id = '${req.body.idPerfil}'`,
      )
    ).rows[0];

    return res.status(200).send(perfil);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salio mal', error });
  }
};

//editar perfil
const editarPerfil = async (req, res) => {
  try {
    //cargar datos del perfil del usuario
    let perfil = await (
      await pool.query(
        `SELECT nombre,apellido,pais,genero,ciudad,fecha_nacimiento FROM perfiles WHERE id_usuario='${req.user.id}'`,
      )
    ).rows[0];

    //cambiar nombre del campo fecha_nacimiento a fechaNacimiento
    perfil.fechaNacimiento = perfil.fecha_nacimiento;
    delete perfil.fecha_nacimiento;

    //actualizar valores de perfil por los ingresados
    req.body.nombre && (perfil.nombre = req.body.nombre);
    req.body.apellido && (perfil.apellido = req.body.apellido);
    req.body.genero && (perfil.genero = req.body.genero);
    req.body.pais && (perfil.pais = req.body.pais);
    req.body.ciudad && (perfil.ciudad = req.body.ciudad);
    if (req.body.fechaNacimiento) {
      const arrFecha = req.body.fechaNacimiento.split('-');
      arrFecha[2] = (Number(arrFecha[2]) + 1).toString();
      const fecha = new Date(arrFecha.join('-'));
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
        req.user.id,
      ],
    };

    await pool.query(query);

    return res.status(200).send('Perfil actualizado!');
  } catch (error) {
    console.log(error);
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
        `SELECT foto FROM perfiles WHERE id_usuario='${req.user.id}'`,
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
      values: [foto, req.user.id],
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
        `SELECT foto FROM perfiles WHERE id_usuario='${req.user.id}'`,
      )
    ).rows[0].foto;

    //obtener public id desde la url
    const public_id = url.match(/orkut\/\w+/gi);

    //borrar foto de cloudinary
    await cloudinary.v2.uploader.destroy(public_id);

    //borrar foto de la base de datos
    await pool.query(
      `UPDATE perfiles SET foto='' WHERE id_usuario='${req.user.id}'`,
    );

    return res.status(200).send('Foto de perfil eliminada con exito!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

//registrar una visita a un perfil
const registrarVisita = async (req, res) => {
  try {
    const idUsuarioVisitado = req.params.idUsuarioVisitado;
    const query = {
      text:
        'INSERT INTO visitas (id_visitante,id_perfil_visitado,fecha_visita) VALUES ($1,$2,$3)',
      values: [req.user.id, idUsuarioVisitado, new Date().toISOString()],
    };

    const respuesta = await pool.query(query);

    return res.status(200).send('Perfil Visitado');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo ha salido mal', error });
  }
};

//estadisticas de visitas
const estadisticasVisitas = async (req, res) => {
  try {
    const visitasTotales = await (
      await pool.query(`
      SELECT COUNT(id) 
      FROM visitas 
      WHERE id_perfil_visitado = '${req.user.id_perfil}'
     `)
    ).rows[0];
    const visitasUltimaSemana = await (
      await pool.query(`
      SELECT COUNT(id) FROM visitas
      WHERE fecha_visita >= NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
      AND fecha_visita <  NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER AND id_perfil_visitado = '${req.user.id_perfil}'
    `)
    ).rows[0];
    const visitantesUltimas24h = await (
      await pool.query(`
      SELECT COUNT(id) 
      FROM visitas 
      WHERE fecha_visita < current_date 
      AND fecha_visita > current_date - 2 
      AND id_perfil_visitado = '${req.user.id_perfil}'
    `)
    ).rows[0];
    const {
      rows: ultimosVisitantes,
    } = await pool.query(`SELECT visitas.id AS id_visita,id_visitante, perfiles.id AS id_perfil, nombre,apellido
      FROM visitas
      JOIN perfiles
      ON perfiles.id_usuario = id_visitante
      WHERE id_perfil_visitado = '${req.user.id_perfil}'
      ORDER BY visitas.id DESC
      LIMIT 200
    `);

    const ultimos10Visitantes = [];

    //filtrar los ultimos 10 visitantes sin repetirlos
    ultimosVisitantes.forEach(visitante => {
      if (ultimos10Visitantes.length === 10) return;

      if (
        !ultimos10Visitantes.find(el => el.id_perfil === visitante.id_perfil)
      ) {
        ultimos10Visitantes.push(visitante);
      }
    });

    const estadisticas = {
      visitasTotales: visitasTotales.count,
      visitasUltimaSemana: visitasUltimaSemana.count,
      visitantesUltimas24h: visitantesUltimas24h.count,
      ultimos10Visitantes,
    };

    return res.status(200).send(estadisticas);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal!', error });
  }
};

//proximos cumpleaños
const proximosCumpleanos = async (req, res) => {
  try {
    const cumpleanos = await (
      await pool.query(`
    SELECT nombre, apellido, foto,fecha_nacimiento, id_usuario as id, perfiles.id as id_perfil
    FROM amistades
    JOIN perfiles
    ON id_usuario1 = id_usuario OR id_usuario2 = id_usuario
    WHERE (id_usuario1='${req.user.id}' OR id_usuario2='${req.user.id}') AND status = 1 AND id_usuario != '${req.user.id}'
    AND  date(date_part('year', current_date)||'-'||date_part('month', fecha_nacimiento)||'-'||date_part('day', fecha_nacimiento))
    between current_date and current_date + interval '30 days'`)
    ).rows;
    return res.status(200).send(cumpleanos);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

module.exports = {
  crearPerfil,
  editarPerfil,
  cambiarFotoPerfil,
  eliminarFotoPerfil,
  cargarDatosPerfil,
  registrarVisita,
  estadisticasVisitas,
  proximosCumpleanos,
};
