import React from 'react';
import { Link } from 'react-router-dom';

import './PanelIzquierdoDashboard.css';
import noavatar from '../img/noavatar.png';

const panelDashboard = (perfil, sexo) => (
  <div className='PanelIzquierdoDashboard sombra'>
    <img src={perfil.foto || noavatar} alt='avatar' />
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

const panelPerfil = (perfil, sexo, usuario) => {
  const sonAmigos = perfil.amigos.find(
    amigo => Number(amigo.id) === Number(usuario.id)
  );

  return (
    <div className='PanelIzquierdoDashboard sombra'>
      <img src={perfil.foto || noavatar} alt='avatar' />
      <hr />
      <Link to='/dashboard'>{perfil.nombre + ' ' + perfil.apellido}</Link>
      <p>{sexo}</p>
      <p>
        {perfil.ciudad}, {perfil.pais}
      </p>
      <hr />
      {sonAmigos ? (
        <a href='#'>👤 eliminar amigo/a</a>
      ) : (
        <a href='#'>🙍‍♂️ añadir como amigo/a</a>
      )}

      <hr />
      <ul>
        <li>
          <a href='#'>🙍‍♂️ perfil</a>
        </li>
        <li>
          <a href='#'>📝 scrapbook</a>
        </li>
        <li>
          <a href='#'>🌞 testimonios</a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

const PanelIzquierdoPerfil = ({ perfil, usuario }) => {
  let sexo;
  if (perfil.genero === 0) {
    sexo = null;
  } else if (perfil.genero === 1) {
    sexo = 'Hombre';
  } else {
    sexo = 'Mujer';
  }

  if (perfil.id === usuario.id_perfil) {
    return panelDashboard(perfil, sexo);
  } else {
    return panelPerfil(perfil, sexo, usuario);
  }
};

export default PanelIzquierdoPerfil;
