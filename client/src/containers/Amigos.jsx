import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelTodosLosAmigos from '../components/PanelTodosLosAmigos';
import { cargarPerfilAction } from '../actions/CargarPerfilAction';

const Amigos = ({
  perfil,
  history,
  match,
  usuario,
  logeado,
  cargarPerfilAction,
}) => {
  useEffect(() => {
    if (!logeado || !perfil || !usuario) {
      history.push('/');
    }

    if (perfil && match.params.id_perfil != perfil.id) {
      cargarPerfilAction(match.params.id_perfil);
    }
  }, []);

  if (perfil && logeado) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelTodosLosAmigos perfil={perfil} />
        </div>
      </div>
    );
  }

  return <div></div>;
};
const mapStateToProps = state => {
  return {
    perfil: state.perfil.perfil,
    usuario: state.login.usuario,
    logeado: state.login.logeado,
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction })(Amigos),
);
