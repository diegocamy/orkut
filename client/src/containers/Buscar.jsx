import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';

import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelBusqueda from '../components/PanelBusqueda';
import Spinner from '../components/Spinner';

const Buscar = ({ logeado, perfil, history, usuario, buscar }) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }
  });

  if (buscar.cargando && !perfil) {
    return <Spinner />;
  }

  if (!buscar.cargando && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelBusqueda buscar={buscar} history={history} />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

const mapStateToProps = state => {
  return {
    usuario: state.login.usuario,
    logeado: state.login.logeado,
    perfil: state.perfil.perfil,
    buscar: state.buscar,
  };
};

export default withRouter(connect(mapStateToProps, {})(Buscar));
