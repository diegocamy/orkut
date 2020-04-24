import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import { cargarSolicitudesPendientes } from '../actions/CargarSolicitudesPendientesAction';

import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelEstadisticas from '../components/PanelEstadisticas';
import Spinner from '../components/Spinner';

const Perfil = ({
  history,
  usuario,
  match,
  cargandoPerfil,
  perfil,
  solicitudes,
  cargarPerfilAction,
  enviadas,
}) => {
  useEffect(() => {
    const idPerfil = match.params.id_perfil;
    if (usuario) {
      if (usuario.id_perfil === Number(idPerfil)) {
        history.push('/dashboard');
      }
    }
    cargarPerfilAction(idPerfil);
    // cargarSolicitudesPendientes();
  }, [match.params.id_perfil, usuario]);

  if (cargandoPerfil) {
    return <Spinner />;
  }

  if (!cargandoPerfil && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil
            perfil={perfil}
            usuario={usuario}
            solicitudes={solicitudes}
            enviadas={enviadas}
          />
          <PanelEstadisticas perfil={perfil} usuario={usuario} />
          <PanelDerechoAmigos amigos={perfil.amigos} />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

const mapStateToProps = state => {
  return {
    usuario: state.login.usuario,
    perfil: state.perfil.perfil,
    cargandoPerfil: state.perfil.cargandoPerfil,
    solicitudes: state.solicitudes.solicitudes,
    enviadas: state.solicitudes.enviadas,
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction, cargarSolicitudesPendientes })(
    Perfil,
  ),
);
