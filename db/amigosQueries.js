const pool = require('./config');

const enviarSolicitud = async (req, res) => {
  try {
    //verificar si la solicitud ya existe
    const solicitud = await (
      await pool.query(
        `SELECT * FROM amistades WHERE 
      id_usuario1='${req.user.id}' AND id_usuario2='${req.params.id}' 
      OR id_usuario1='${req.params.id}' AND id_usuario2='${req.user.id}'`
      )
    ).rows[0];

    if (solicitud) {
      return res.status(200).send('Ya existe una solicitud de amistad');
    }

    //si no hay una solicitud entonces enviar una
    const query = {
      text:
        'INSERT INTO amistades (id_usuario1,id_usuario2,status,fecha) VALUES ($1,$2,$3,$4)',
      values: [req.user.id, req.params.id, 0, new Date().toISOString()]
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
    const query = `SELECT nombre, apellido, foto, id_usuario1 as id_solicitante, status, fecha
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

module.exports = {
  enviarSolicitud,
  verSolicitudesPendientes
};
