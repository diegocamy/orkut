import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';
import Navbar from '../components/Navbar';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import { cargarSolicitudesPendientes } from '../actions/CargarSolicitudesPendientesAction';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelEstadisticas from '../components/PanelEstadisticas';
import Spinner from '../components/Spinner';

const Dashboard = ({
  logeado,
  usuario,
  cargandoPerfil,
  perfil,
  history,
  solicitudes,
  cargarPerfilAction,
  mensajeSolicitudes,
  scraps,
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logeado, usuario, history]);

  if (cargandoPerfil) {
    return <Spinner />;
  }

  if (logeado && perfil) {
    return (
      <div className='Pagina'>
        <Navbar error={mensajeSolicitudes} />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelEstadisticas
            scraps={scraps}
            perfil={perfil}
            usuario={usuario}
            solicitudes={solicitudes}
          />
          <PanelDerechoAmigos amigos={perfil.amigos} perfil={perfil} />
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
    cargandoPerfil: state.perfil.cargandoPerfil,
    perfil: state.perfil.perfil,
    solicitudes: state.solicitudes.solicitudes,
    mensajeSolicitudes: state.solicitudes.mensaje,
    scraps: state.scraps.scraps,
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction, cargarSolicitudesPendientes })(
    Dashboard,
  ),
);
