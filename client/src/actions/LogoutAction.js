import axios from 'axios';

import {
  USER_LOGOUT_INICIADO,
  USER_LOGOUT_EXITO,
  USER_LOGOUT_ERROR
} from '../types';

export const userLogout = () => async dispatch => {
  try {
    dispatch(userLogoutIniciado());
    await (await axios.post('/api/users/logout', {}, { withCredentials: true }))
      .data;
    dispatch(userLogoutExito());
  } catch (error) {
    if (error.response.data) {
      const err = error.response.data.mensaje;
      dispatch(userLogoutError(err));
    }
  }
};

const userLogoutIniciado = () => {
  return {
    type: USER_LOGOUT_INICIADO
  };
};

const userLogoutExito = () => {
  return {
    type: USER_LOGOUT_EXITO
  };
};

const userLogoutError = error => {
  return {
    type: USER_LOGOUT_ERROR,
    payload: error
  };
};
