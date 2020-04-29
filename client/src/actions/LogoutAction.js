import axios from 'axios';

import {
  USER_LOGOUT_INICIADO,
  USER_LOGOUT_EXITO,
  USER_LOGOUT_ERROR,
} from '../types';

export const userLogout = history => async dispatch => {
  try {
    dispatch(userLogoutIniciado());
    await (await axios.post('/api/users/logout', {}, { withCredentials: true }))
      .data;
    dispatch(userLogoutExito());
    history.push('/');
  } catch (error) {
    console.log(error);
    dispatch(userLogoutError('Algo salio mal'));
  }
};

const userLogoutIniciado = () => {
  return {
    type: USER_LOGOUT_INICIADO,
  };
};

const userLogoutExito = () => {
  return {
    type: USER_LOGOUT_EXITO,
  };
};

const userLogoutError = error => {
  return {
    type: USER_LOGOUT_ERROR,
    payload: error,
  };
};
