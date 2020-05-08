import React from 'react';
import { Link } from 'react-router-dom';

import noAvatar from '../img/noavatar.png';
import './PanelTestimoniosPendientes.css';

const mostrarTestimonios = (
  testimonios,
  perfil,
  aceptarTestimonio,
  rechazarTestimonio,
) => {
  return testimonios.map(t => {
    return (
      <div className='testimonio-pendiente' key={t.id_testimonio}>
        <div className='tp-izquierda'>
          <img src={t.foto || noAvatar} alt='foto-testi' />
        </div>
        <div className='tp-derecha'>
          <div className='tp-cabecera'>
            <Link to={`/perfil/${t.id_perfil}`}>{t.nombre}</Link>
            <div className='botones'>
              <button
                onClick={e => aceptarTestimonio(t.id_testimonio, perfil.id)}
              >
                aceptar
              </button>
              <button
                onClick={e => rechazarTestimonio(t.id_testimonio, perfil.id)}
              >
                rechazar
              </button>
            </div>
          </div>
          <p>{t.mensaje}</p>
        </div>
      </div>
    );
  });
};

const PanelTestimoniosPendientes = ({
  testimonios,
  perfil,
  aceptarTestimonio,
  rechazarTestimonio,
}) => {
  return (
    <div className='PanelTestimoniosPendientes sombra'>
      <h3>nuevos testimonios</h3>
      {mostrarTestimonios(
        testimonios,
        perfil,
        aceptarTestimonio,
        rechazarTestimonio,
      )}
    </div>
  );
};

export default PanelTestimoniosPendientes;
