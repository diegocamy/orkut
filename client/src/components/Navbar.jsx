import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { userLogout } from '../actions/LogoutAction';
import { buscarUsuarios } from '../actions/BuscarUsuariosAction';

import './Navbar.css';

const Navbar = ({ usuario, userLogout, history, buscarUsuarios }) => {
  const [busqueda, setBusqueda] = useState('');

  const buscarUsuario = e => {
    e.preventDefault();
    buscarUsuarios(busqueda, history);
  };

  return (
    <div className='Navbar'>
      <div className='izquierda'>
        <ul>
          <li className='minilogo'>orkut</li>
          <li>
            <Link to='/dashboard'>Home</Link>
          </li>
          <li>
            <Link to='/'>Scrapbook</Link>
          </li>
          <li>
            <Link to='/'>Amigos</Link>
          </li>
        </ul>
      </div>
      <div className='derecha'>
        <span className='email'>{usuario.email}</span>
        <button className='btn-salir' onClick={() => userLogout()}>
          Salir
        </button>
        <form onSubmit={e => buscarUsuario(e)}>
          <input
            type='text'
            placeholder='Buscar en Orkut'
            value={busqueda}
            onChange={e => {
              setBusqueda(e.target.value);
            }}
          />
          <button>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    usuario: state.login.usuario
  };
};

export default withRouter(
  connect(mapStateToProps, { userLogout, buscarUsuarios })(Navbar)
);
