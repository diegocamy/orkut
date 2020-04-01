import axios from 'axios';
import jwt from 'jsonwebtoken';

import { setearAuthorizationHeader } from '../utils';

import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGIN_ERROR
} from '../types';

export const userLogin = (email, password, history) => async dispatch => {
  try {
    dispatch(userLoginIniciado());
    const respuesta = await axios.post('/api/users/login', { email, password });
    //extraer token
    const token = respuesta.data.token;
    //guardar token en localstore
    localStorage.setItem('orkutToken', token);
    //setear Authorization Header en axios
    setearAuthorizationHeader(token);
    //token sin la palabra 'Bearer'
    const tokenSinBearer = token.split(' ')[1];
    //decodificar jwt
    const usuario = jwt.decode(tokenSinBearer);
    //guardar user logeado en redux store
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
