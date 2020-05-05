import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelDerechoAmigos from '../components/PanelDerechoAmigos';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import { cargarSolicitudesPendientes } from '../actions/CargarSolicitudesPendientesAction';
import { registrarVisita } from '../actions/RegistrarVisitaAction';

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
  scraps,
  logeado,
  registrarVisita,
}) => {
  useEffect(() => {
    const idPerfil = match.params.id_perfil;

    if (!logeado) {
      history.push('/');
    }

    if (usuario) {
      if (usuario.id_perfil === Number(idPerfil)) {
        history.push('/dashboard');
      }
    }

    if (logeado) {
      cargarPerfilAction(idPerfil);
      if (usuario.id_perfil != idPerfil) {
        registrarVisita(idPerfil);
      }
    }
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
          <PanelEstadisticas
            perfil={perfil}
            usuario={usuario}
            scraps={scraps}
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
    usuario: state.login.usuario,
    logeado: state.login.logeado,
    perfil: state.perfil.perfil,
    cargandoPerfil: state.perfil.cargandoPerfil,
    solicitudes: state.solicitudes.solicitudes,
    enviadas: state.solicitudes.enviadas,
    scraps: state.scraps.scraps,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    cargarPerfilAction,
    registrarVisita,
    cargarSolicitudesPendientes,
  })(Perfil),
);
