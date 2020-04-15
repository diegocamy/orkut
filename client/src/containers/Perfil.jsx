import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelEstadisticas from '../components/PanelEstadisticas';

const Perfil = ({
  history,
  usuario,
  match,
  cargandoPerfil,
  perfil,
  cargarPerfilAction
}) => {
  useEffect(() => {
    const idPerfil = match.params.id_perfil;
    if (usuario) {
      if (usuario.id_perfil === Number(idPerfil)) {
        history.push('/dashboard');
      }
    }
    cargarPerfilAction(idPerfil);
  }, [match.params.id_perfil, usuario]);

  if (cargandoPerfil) {
    return <h1>CARGANDO PERFIL</h1>;
  }

  if (!cargandoPerfil && perfil) {
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
    usuario: state.login.usuario,
    perfil: state.perfil.perfil,
    cargandoPerfil: state.perfil.cargandoPerfil
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction })(Perfil)
);
