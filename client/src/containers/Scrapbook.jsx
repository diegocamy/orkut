import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import Spinner from '../components/Spinner';
import { cargarPerfilAction } from '../actions/CargarPerfilAction';
import { enviarScrap } from '../actions/EnviarScrapAction';
import { eliminarScrap } from '../actions/EliminarScrapAction';
import PanelScraps from '../components/PanelScraps';

const Scrapbook = ({
  perfil,
  usuario,
  history,
  match,
  logeado,
  cargarPerfilAction,
  cargandoPerfil,
  scraps,
  enviarScrap,
  eliminarScrap,
}) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }

    // const idPerfil = match.params.id_perfil;
    // cargarPerfilAction(idPerfil);
  }, [match.params.id_perfil, usuario]);

  if (!cargandoPerfil && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <div
            className='vertical'
            style={{ display: 'flex', flexDirection: 'column', width: '85%' }}
          >
            <PanelScraps
              scraps={scraps}
              perfil={perfil}
              usuario={usuario}
              enviarScrap={enviarScrap}
              eliminarScrap={eliminarScrap}
            />
          </div>
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
    scraps: state.scraps.scraps,
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction, enviarScrap, eliminarScrap })(
    Scrapbook,
  ),
);
