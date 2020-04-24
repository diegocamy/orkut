const pool = require('./config');

const enviarSolicitud = async (req, res) => {
  try {
    //verificar si la solicitud ya existe
    const solicitud = await (
      await pool.query(
        `SELECT * FROM amistades WHERE 
      id_usuario1='${req.user.id}' AND id_usuario2='${req.params.idUsuario2}' 
      OR id_usuario1='${req.params.idUsuario2}' AND id_usuario2='${req.user.id}'`,
      )
    ).rows[0];

    if (solicitud) {
      return res.status(200).send('Ya existe una solicitud de amistad');
    }

    //si no hay una solicitud entonces enviar una
    const query = {
      text:
        'INSERT INTO amistades (id_usuario1,id_usuario2,status,fecha,mensaje) VALUES ($1,$2,$3,$4,$5)',
      values: [
        req.user.id,
        req.params.idUsuario2,
        0,
        new Date().toISOString(),
        req.body.mensaje,
      ],
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
     amistades.id AS id_solicitud, mensaje, email, perfiles.id AS id_perfil, nombre, apellido, foto, id_usuario1 AS id_solicitante, status, fecha
     FROM perfiles 
     JOIN usuarios 
     ON usuarios.id = perfiles.id_usuario 
     JOIN amistades 
     ON usuarios.id = id_usuario1 
     WHERE id_usuario2 = '${req.user.id}' AND status=0`;

    const solicitudes = await (await pool.query(query)).rows;

    return res.status(200).json(solicitudes);
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Ha ocurrido un error', error: error.message });
  }
};

const verSolicitudesEnviadasPendientes = async (req, res) => {
  try {
    //buscar las solicitudes enviadas que estan pendientes
    const query = `SELECT amistades.id AS id_solicitud, nombre, perfiles.id AS id_perfil, mensaje, id_usuario2 AS id_usuario_solicitado
    FROM amistades
    JOIN perfiles
    ON amistades.id_usuario2 = perfiles.id_usuario
    WHERE id_usuario1 = '${req.user.id}' and status = 0`;

    const solicitudesEnviadasPendientes = await (await pool.query(query)).rows;

    //devolver solicitudes
    return res.status(200).json(solicitudesEnviadasPendientes);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salio mal', error });
  }
};

const aceptarSolicitud = async (req, res) => {
  try {
    const respuesta = await (
      await pool.query(
        `UPDATE amistades SET status = 1 WHERE id='${req.params.idSolicitud}'`,
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
        `DELETE FROM amistades WHERE id='${req.params.idSolicitud}'`,
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
      OR id_usuario1='${req.params.idAmigo}' AND id_usuario2='${req.user.id}' AND status = 1`,
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

const verListaAmigos = async (req, res) => {
  try {
    const listaAmigos = await (
      await pool.query(`
      SELECT (SELECT COUNT(status) as amigos
      FROM amistades
      WHERE (id_usuario1=id_usuario OR id_usuario2=id_usuario) AND status=1), nombre, apellido, foto, id_usuario as id, perfiles.id as id_perfil
      FROM amistades
      JOIN perfiles
      ON id_usuario1 = id_usuario OR id_usuario2 = id_usuario
      WHERE (id_usuario1='${req.body.idUsuario}' OR id_usuario2='${req.body.idUsuario}') AND status = 1 AND id_usuario != '${req.body.idUsuario}'
    `)
    ).rows;

    return res.status(200).json(listaAmigos);
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
  eliminarAmigo,
  verListaAmigos,
  verSolicitudesEnviadasPendientes,
};
