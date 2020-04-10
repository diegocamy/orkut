import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLogout } from '../actions/LogoutAction';

import './Navbar.css';

const Navbar = ({ usuario, userLogout }) => {
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
        <form action='submit'>
          <input type='text' placeholder='Buscar en Orkut' />
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

export default connect(mapStateToProps, { userLogout })(Navbar);
