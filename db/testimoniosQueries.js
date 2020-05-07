const pool = require('../db/config');

//ver todos los testimonios aceptados
const cargarListaTestimoniosAceptados = async (req, res) => {
  try {
    const { rows: testimonios } = await pool.query(`
    SELECT testimonios.id as id_testimonio, mensaje, foto, perfiles.id, nombre, apellido, fecha
    FROM testimonios
    JOIN perfiles
    ON emisor = perfiles.id_usuario
    WHERE receptor = '${req.user.id}' and testimonios.estatus = 1
    `);
    return res.status(200).send(testimonios);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//ver todos los testimonios pendientes
const cargarListaTestimoniosPendientes = async (req, res) => {
  try {
    const { rows: testimonios } = await pool.query(`
    SELECT testimonios.id as id_testimonio, mensaje, foto, perfiles.id, nombre, apellido, fecha
    FROM testimonios
    JOIN perfiles
    ON emisor = perfiles.id_usuario
    WHERE receptor = '${req.user.id}' and testimonios.estatus = 0
    `);
    return res.status(200).send(testimonios);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//enviar un testimonio
const enviarTestimonio = async (req, res) => {
  try {
    const receptor = req.body.receptor;
    const mensaje = req.body.mensaje;

    await pool.query(`INSERT INTO testimonios (emisor,receptor,mensaje)
    VALUES ('${req.user.id}','${receptor}','${mensaje}')`);

    return res.status(200).send('Testimonio enviado!');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//aceptar un testimonio
const aceptarTestimonio = async (req, res) => {
  try {
    await pool.query(
      `UPDATE testimonios SET estatus=1 WHERE id='${req.params.idTestimonio}' AND receptor = '${req.user.id}'`,
    );
    return res.status(200).send('Testimonio aceptado!');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//rechazar un testimonio
const rechazarTestimonio = async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM testimonios WHERE id='${req.params.idTestimonio}' AND receptor='${req.user.id} AND estatus = 0'`,
    );
    return res.status(200).send('Testimonio rechazado!');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

//eliminar un testimonio
const eliminarTestimonio = async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM testimonios WHERE id='${req.params.idTestimonio}' AND receptor='${req.user.id}' OR emisor = '${req.user.id}'`,
    );
    return res.status(200).send('Testimonio eliminado');
  } catch (error) {
    return res.status(400).json({ mensaje: 'Algo salió mal', error });
  }
};

module.exports = {
  cargarListaTestimoniosAceptados,
  cargarListaTestimoniosPendientes,
  enviarTestimonio,
  aceptarTestimonio,
  rechazarTestimonio,
  eliminarTestimonio,
};
