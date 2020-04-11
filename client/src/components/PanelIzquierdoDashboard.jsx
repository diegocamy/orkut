import React from 'react';
import { Link } from 'react-router-dom';

import './PanelIzquierdoDashboard.css';

const PanelIzquierdoDashboard = ({ perfil }) => {
  let sexo;
  if (perfil.genero === 0) {
    sexo = null;
  } else if (perfil.genero === 1) {
    sexo = 'Hombre';
  } else {
    sexo = 'Mujer';
  }
  return (
    <div className='PanelIzquierdoDashboard sombra'>
      <img src={perfil.foto} alt='avatar' />
      <hr />
      <Link to='/dashboard'>{perfil.nombre + ' ' + perfil.apellido}</Link>
      <p>{sexo}</p>
      <p>
        {perfil.ciudad}, {perfil.pais}
      </p>
      <hr />
      <a href='#'>🔨 editar perfil</a>
      <hr />
      <ul>
        <li>
          <a href='#'>🙍‍♂️ perfil</a>
        </li>
        <li>
          <a href='#'>📝 scrapbook</a>
        </li>
        <li>
          <a href='#'>👥 amigos</a>
        </li>
        <li>
          <a href='#'>🌞 testimonios</a>
        </li>
        <li>
          <a href='#'>🔧 ajustes</a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default PanelIzquierdoDashboard;
