import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Pagina.css';

import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import Spinner from '../components/Spinner';
import PanelEditarPerfil from '../components/PanelEditarPerfil';

import { editarPerfil } from '../actions/EditarPerfilAction';

const EditarPerfil = ({
  logeado,
  perfil,
  history,
  match,
  usuario,
  solicitudes,
  enviadas,
  editarPerfil,
}) => {
  useEffect(() => {
    if (!logeado || !perfil) {
      history.push('/');
    }
  }, []);

  if (perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil
            perfil={perfil}
            usuario={usuario}
            solicitudes={solicitudes}
            enviadas={enviadas}
            match={match}
          />
          <PanelEditarPerfil perfil={perfil} editarPerfil={editarPerfil} />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

const mapStateToProps = state => {
  return {
    logeado: state.login.logeado,
    perfil: state.perfil.perfil,
    usuario: state.login.usuario,
    solicitudes: state.solicitudes.solicitudes,
    enviadas: state.solicitudes.enviadas,
  };
};

export default withRouter(
  connect(mapStateToProps, { editarPerfil })(EditarPerfil),
);
