const pool = require('./config');

const enviarSolicitud = async (req, res) => {
  try {
    //verificar si la solicitud ya existe
    const solicitud = await (
      await pool.query(
        `SELECT * FROM amistades WHERE 
      id_usuario1='${req.user.id}' AND id_usuario2='${req.params.idUsuario2}' 
      OR id_usuario1='${req.params.idUsuario2}' AND id_usuario2='${req.user.id}'`
      )
    ).rows[0];

    if (solicitud) {
      return res.status(200).send('Ya existe una solicitud de amistad');
    }

    //si no hay una solicitud entonces enviar una
    const query = {
      text:
        'INSERT INTO amistades (id_usuario1,id_usuario2,status,fecha) VALUES ($1,$2,$3,$4)',
      values: [req.user.id, req.params.idUsuario2, 0, new Date().toISOString()]
    };

    await pool.query(query);

    return res.status(200).send('Solicitud enviada!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

const verSolicitudesPendientes = async (req, res) => {
  try {
    //obtener todas las solicitudes pendientes para el usuario logeado
    const query = `SELECT 
     amistades.id AS id_solicitud, nombre, apellido, foto, id_usuario1 AS id_solicitante, status, fecha
     FROM perfiles 
     JOIN usuarios 
     ON usuarios.id = perfiles.id_usuario 
     JOIN amistades 
     ON usuarios.id = id_usuario1 
     WHERE id_usuario2 = '${req.user.id}' AND status=0`;

    const solicitudes = await (await pool.query(query)).rows;

    return res.json(solicitudes);
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error', error: error.message });
  }
};

const aceptarSolicitud = async (req, res) => {
  try {
    const respuesta = await (
      await pool.query(
        `UPDATE amistades SET status = 1 WHERE id='${req.params.idSolicitud}'`
      )
    ).rowCount;

    if (respuesta === 0) {
      return res.status(200).send('No se pudo aceptar la solicitud');
    }

    return res.status(200).send('Solicitud Aceptada!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error', error: error.message });
  }
};

const rechazarSolicitud = async (req, res) => {
  try {
    const respuesta = await (
      await pool.query(
        `DELETE FROM amistades WHERE id='${req.params.idSolicitud}'`
      )
    ).rowCount;

    if (respuesta === 0) {
      return res.status(200).send('No se pudo rechazar la solicitud');
    }

    return res.status(200).send('Solicitud Rechazada!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error', error: error.message });
  }
};

const eliminarAmigo = async (req, res) => {
  try {
    const respuesta = await (
      await pool.query(
        `DELETE FROM amistades 
      WHERE id_usuario1='${req.user.id}' AND id_usuario2='${req.params.idAmigo}' AND status = 1
      OR id_usuario1='${req.params.idAmigo}' AND id_usuario2='${req.user.id}' AND status = 1`
      )
    ).rowCount;

    if (respuesta === 0) {
      return res.status(200).send('No existe esa amistad!');
    }

    return res.status(200).send('Amigo eliminado!');
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error!', error: error.message });
  }
};

module.exports = {
  enviarSolicitud,
  verSolicitudesPendientes,
  aceptarSolicitud,
  rechazarSolicitud,
  eliminarAmigo
};
