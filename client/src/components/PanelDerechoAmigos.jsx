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

const PanelDerechoAmigos = ({ amigos, perfil }) => {
  return (
    <div className='PanelDerechoAmigos sombra'>
      <h3>
        amigos <Link to={`/amigos/${perfil.id}`}>({amigos.length})</Link>
      </h3>
      <div className='box-amigos'>{mostrarAmigos(amigos)}</div>
      <hr />
      <div className='ver-todos'>
        <Link to={`/amigos/${perfil.id}`}>ver todos</Link>
      </div>
    </div>
  );
};

export default PanelDerechoAmigos;
