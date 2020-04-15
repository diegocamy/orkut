import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';
import Navbar from '../components/Navbar';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
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

    if (logeado) {
      cargarPerfilAction(usuario.id_perfil);
    }
  }, [logeado, usuario, history]);

  if (cargandoPerfil) {
    return <h1 style={{ margin: '10px auto' }}>Cargando...</h1>;
  }

  if (logeado && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelEstadisticas perfil={perfil} usuario={usuario} />
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
    cargandoPerfil: state.perfil.cargandoPerfil,
    perfil: state.perfil.perfil
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction })(Dashboard)
);