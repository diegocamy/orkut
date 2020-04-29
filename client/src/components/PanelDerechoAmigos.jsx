import React from 'react';
import { Link } from 'react-router-dom';

import './PanelDerechoAmigos.css';
import noavatar from '../img/noavatar.png';

const mostrarAmigos = amigos => {
  return amigos.slice(0, 9).map(amigo => {
    return (
      <div key={amigo.id}>
        <img src={amigo.foto || noavatar} alt='foto-amigo' />
        <Link to={`/perfil/${amigo.id_perfil}`}>
          {amigo.nombre} ({amigo.amigos})
        </Link>
      </div>
    );
  });
};

const PanelDerechoAmigos = ({ amigos }) => {
  return (
    <div className='PanelDerechoAmigos sombra'>
      <h3>
        amigos <a href='#'>({amigos.length})</a>
      </h3>
      <div className='box-amigos'>{mostrarAmigos(amigos)}</div>
      <hr />
      <div className='ver-todos'>
        <Link to='/amigos'>ver todos</Link>
      </div>
    </div>
  );
};

export default PanelDerechoAmigos;
