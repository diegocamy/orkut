import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';
import Navbar from '../components/Navbar';
import CrearPerfilForm from '../components/CrearPerfilForm';
import Spinner from '../components/Spinner';

const CrearPerfil = ({ logeado, usuario, history }) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }
  });

  if (logeado && usuario) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <CrearPerfilForm />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

const mapStateToProps = state => {
  return {
    logeado: state.login.logeado,
    usuario: state.login.usuario,
  };
};

export default withRouter(connect(mapStateToProps, {})(CrearPerfil));
