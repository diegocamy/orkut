import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';

import Navbar from '../components/Navbar';
import PanelIzquierdoDashboard from '../components/PanelIzquierdoDashboard';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';
import PanelBusqueda from '../components/PanelBusqueda';

const Buscar = ({ logeado, perfil, history, buscar }) => {
  if (!logeado || !perfil) {
    history.push('/');
  }

  if (buscar.cargando) {
    return <h1>CARGANDOOOOOOOOOOOOOOOOOOOOOOWOWOWOWO</h1>;
  }

  if (logeado && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoDashboard perfil={perfil} />
          <PanelBusqueda buscar={buscar} />
          <PanelDerechoAmigos amigos={perfil.amigos} />
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => {
  return {
    logeado: state.login.logeado,
    perfil: state.login.perfil,
    buscar: state.buscar
  };
};

export default withRouter(connect(mapStateToProps, {})(Buscar));
