import axios from 'axios';

import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGIN_ERROR
} from '../types';

export const userLogin = (email, password) => async dispatch => {
  try {
    //iniciar login
    dispatch(userLoginIniciado());
    //obtener respuesta del server
    const usuario = await (
      await axios.post('/api/users/login', { email, password })
    ).data;
    //guardar usuario logeado en redux store
    dispatch(userLoginExito(usuario));
  } catch (error) {
    if (error.response.data) {
      const mensaje = error.response.data;
      dispatch(userLoginError(mensaje));
    }
  }
};

const userLoginIniciado = () => {
  return {
    type: USER_LOGIN_INICIADO
  };
};

const userLoginExito = usuario => {
  return {
    type: USER_LOGIN_EXITO,
    payload: usuario
  };
};

const userLoginError = error => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error
  };
};
