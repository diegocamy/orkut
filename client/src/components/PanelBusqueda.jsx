import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { buscarUsuarios } from '../actions/BuscarUsuariosAction';

import './PanelBusqueda.css';
import noavatar from '../img/noavatar.png';

const usuariosEncontrados = usuarios => {
  return usuarios.map(usuario => {
    return (
      <React.Fragment key={usuario.id_usuario}>
        <div className='usuario'>
          <div className='foto'>
            <img src={usuario.foto || noavatar} alt='foto' />
          </div>
          <div className='datos'>
            <Link to={`/perfil/${usuario.id_perfil}`}>
              {usuario.nombre} {usuario.apellido}
            </Link>
            <p>{usuario.ciudad}</p>
            <p>{usuario.pais}</p>
            <div>
              <p>📝 {usuario.scraps} scraps</p>
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  });
};

const PanelBusqueda = ({ buscar, buscarUsuarios, history }) => {
  const [busqueda, setBusqueda] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (busqueda) {
      buscarUsuarios(busqueda, history);
    }
    setBusqueda('');
  };

  return (
    <div className='PanelBusqueda sombra'>
      <h2>Mostrando resultados para {buscar.busqueda}</h2>
      <p className='migas'>
        <Link to='/dashboard'>Home</Link> > Buscar
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='buscar'>Buscar de nuevo</label>
        <input
          type='text'
          name='buscar'
          onChange={e => setBusqueda(e.target.value)}
          value={busqueda}
        />
        <button>Buscar</button>
      </form>
      <hr />
      <div className='numero-resultados'>
        <span>
          <strong>1 - 12</strong> de <strong>{buscar.resultados.length}</strong>{' '}
          resultados
        </span>
        <span>1 2 3 4 5 ></span>
      </div>
      <hr />
      <div className='resultados'>{usuariosEncontrados(buscar.resultados)}</div>
    </div>
  );
};

export default connect(null, { buscarUsuarios })(PanelBusqueda);
