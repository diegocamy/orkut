import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import noAvatar from '../img/noavatar.png';
import './PanelTodosLosAmigos.css';

const mostrarAmigos = (amigos, filtro) => {
  const filtrados = amigos.filter(amigo => {
    if (
      amigo.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      amigo.apellido.toLowerCase().includes(filtro.toLowerCase())
    ) {
      return amigo;
    }

    return null;
  });

  const arrayAmigos = filtrados.map(amigo => {
    return (
      <div className='amigo' key={amigo.id}>
        <div className='foto'>
          <img src={amigo.foto || noAvatar} alt='foto-perfil' />
        </div>
        <div className='info'>
          <Link to={`/perfil/${amigo.id_perfil}`}>
            {amigo.nombre} {amigo.apellido} ({amigo.amigos})
          </Link>
          <p>{amigo.ciudad}</p>
          <p>{amigo.pais}</p>
        </div>
      </div>
    );
  });

  return arrayAmigos;
};

const PanelTodosLosAmigos = ({ perfil }) => {
  const [filtro, setFiltro] = useState('');
  return (
    <div className='PanelTodosLosAmigos sombra'>
      <h2>Amigos de {perfil.nombre}</h2>
      <hr />
      <div className='filtro'>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor='filtrar'>Filtrar: </label>
          <input
            type='text'
            value={filtro}
            placeholder='Ingresa el nombre de un amigo'
            onChange={e => setFiltro(e.target.value)}
          />
        </form>
      </div>
      <hr />
      <div className='contenedor-amigos'>
        {mostrarAmigos(perfil.amigos, filtro)}
      </div>
    </div>
  );
};

export default PanelTodosLosAmigos;
