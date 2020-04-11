import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';
import Navbar from '../components/Navbar';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';
import PanelIzquierdoDashboard from '../components/PanelIzquierdoDashboard';
import PanelEstadisticas from '../components/PanelEstadisticas';

const Dashboard = ({
  logeado,
  usuario,
  cargandoPerfil,
  perfil,
  history,
  cargarPerfilAction
}) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }

    if (logeado && !usuario.id_perfil) {
      history.push('/crearPerfil');
    }

    cargarPerfilAction();
  }, [logeado, usuario, history]);

  if (cargandoPerfil) {
    return <h1 style={{ margin: '10px auto' }}>Cargando...</h1>;
  }

  if (logeado && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoDashboard perfil={perfil} />
          <PanelEstadisticas perfil={perfil} />
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
    usuario: state.login.usuario,
    cargandoPerfil: state.login.cargandoPerfil,
    perfil: state.login.perfil
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction })(Dashboard)
);
