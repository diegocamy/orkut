import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from '../components/Spinner';
import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import { enviarTestimonio } from '../actions/EnviarTestimonioAction';
import { eliminarTestimonio } from '../actions/EliminarTestimonioAction';
import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import PanelTestimonios from '../components/PanelTestimonios';

const Testimonios = ({
  usuario,
  logeado,
  perfil,
  cargandoPerfil,
  history,
  match,
  enviarTestimonio,
  eliminarTestimonio,
  cargarPerfilAction,
}) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }
    if (perfil && Number(perfil.id) !== Number(match.params.id_perfil)) {
      cargarPerfilAction(match.params.id_perfil);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id_perfil, usuario]);

  if (!cargandoPerfil && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelTestimonios
            perfil={perfil}
            match={match}
            usuario={usuario}
            enviarTestimonio={enviarTestimonio}
            eliminarTestimonio={eliminarTestimonio}
          />
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
  };
};

export default withRouter(
  connect(mapStateToProps, {
    enviarTestimonio,
    cargarPerfilAction,
    eliminarTestimonio,
  })(Testimonios),
);
