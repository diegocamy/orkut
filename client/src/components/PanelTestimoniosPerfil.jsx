import React from 'react';
import { Link } from 'react-router-dom';

import noAvatar from '../img/noavatar.png';
import './PanelTestimoniosPendientes.css';

const mostrarTestimonios = testimonios => {
  return testimonios.map(t => {
    return (
      <div className='testimonio-pendiente' key={t.id_testimonio}>
        <div className='tp-izquierda'>
          <img src={t.foto || noAvatar} alt='foto-testi' />
        </div>
        <div className='tp-derecha'>
          <div className='tp-cabecera'>
            <Link to={`/perfil/${t.id_perfil}`}>{t.nombre}</Link>
          </div>
          <p>{t.mensaje}</p>
        </div>
      </div>
    );
  });
};

const PanelTestimoniosPerfil = ({ testimonios }) => {
  return (
    <div className='PanelTestimoniosPendientes sombra'>
      <h3>sus testimonios</h3>
      {mostrarTestimonios(testimonios)}
    </div>
  );
};

export default PanelTestimoniosPerfil;
