import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PanelIzquierdoPerfil from '../components/PanelIzquierdoPerfil';
import Spinner from '../components/Spinner';
import PanelAjustes from '../components/PanelAjustes';

import { cambiarPass } from '../actions/CambiarPasswordAction';
import { eliminarCuenta } from '../actions/EliminarcuentaAction';

const Ajustes = ({
  usuario,
  logeado,
  perfil,
  cargandoPerfil,
  history,
  cambiarPass,
  eliminarCuenta,
  mensaje,
}) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }
  }, [logeado, history]);

  if (!cargandoPerfil && perfil) {
    return (
      <div className='Pagina'>
        <Navbar />
        <div className='container'>
          <PanelIzquierdoPerfil perfil={perfil} usuario={usuario} />
          <PanelAjustes
            mensaje={mensaje}
            cambiarPass={cambiarPass}
            eliminarCuenta={eliminarCuenta}
            history={history}
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
    mensaje: state.cambiarPassword.mensaje,
  };
};

export default withRouter(
  connect(mapStateToProps, { cambiarPass, eliminarCuenta })(Ajustes),
);
