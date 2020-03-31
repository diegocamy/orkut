import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGIN_ERROR
} from '../types';
import axios from 'axios';

export const userLogin = (email, password, history) => async dispatch => {
  try {
    dispatch(userLoginIniciado());
    const respuesta = await axios.post('/api/users/login', { email, password });
    //extraer token
    const token = respuesta.data.token;
    //guardar token en localstore
    console.log(token);
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

const userLoginExito = () => {
  return {
    type: USER_LOGIN_EXITO
  };
};

const userLoginError = error => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error
  };
};
