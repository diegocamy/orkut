const pool = require('./config');

//enviar un scrap
const enviarScrap = async (req, res) => {
  try {
    const scrap = req.body.scrap;
    const receptor = req.params.idUsuarioReceptor;
    const emisor = req.user.id;

    if (!scrap || scrap.length === 0) {
      return res.status(400).send('El scrap debe contener un mensaje!');
    }

    const query = {
      text:
        'INSERT INTO scraps (emisor,receptor,mensaje,fecha) VALUES ($1,$2,$3,$4)',
      values: [emisor, receptor, scrap, new Date().toISOString()],
    };

    const respuesta = await pool.query(query);

    if (respuesta) {
      return res.status(200).send('Scrap enviado');
    }
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//cargar scraps
const cargarScraps = async (req, res) => {
  try {
    const scraps = await pool.query(`
    SELECT scraps.id AS id_scrap, emisor,receptor,mensaje,fecha,nombre,foto,perfiles.id AS id_perfil, usuarios.id AS id_usuario 
    FROM scraps
    JOIN usuarios
    ON usuarios.id = emisor
    JOIN perfiles
    ON perfiles.id_usuario = usuarios.id
    WHERE receptor = '${req.params.idUsuario}'
    ORDER BY scraps.id DESC`);

    return res.status(200).send(scraps.rows);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal!', error });
  }
};

//eliminar scrap
const eliminarScrap = async (req, res) => {
  try {
    //verificar si el usuario es emisor o receptor en el scrap que desea eliminar
    const scrap = await (
      await pool.query(`SELECT * FROM scraps WHERE id='${req.params.idScrap}'`)
    ).rows[0];

    if (
      Number(scrap.emisor) === Number(req.user.id) ||
      Number(scrap.receptor) === Number(req.user.id)
    ) {
      //eliminar scrap
      const response = await pool.query(
        `DELETE FROM scraps WHERE id = '${req.params.idScrap}'`,
      );

      return res.status(200).send('Scrap eliminado');
    }

    return res.status(400).send('No tiene permisos para eliminar este scrap');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

module.exports = {
  enviarScrap,
  cargarScraps,
  eliminarScrap,
};
