import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userLogout } from '../actions/LogoutAction';

const Dashboard = ({ logeado, usuario, history, userLogout }) => {
  useEffect(() => {
    if (!logeado) history.push('/');
  }, [logeado, usuario, history]);

  if (usuario && usuario.id) {
    return (
      <div>
        <h1>Hola tu numero de id es: {usuario.id} </h1>
        <button onClick={() => userLogout()}>Salir</button>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => {
  return {
    logeado: state.login.logeado,
    usuario: state.login.usuario
  };
};

export default withRouter(connect(mapStateToProps, { userLogout })(Dashboard));
