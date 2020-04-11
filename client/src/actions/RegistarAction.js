import axios from 'axios';

import {
  USER_REGISTER_INICIADO,
  USER_REGISTER_EXITO,
  USER_REGISTER_ERROR,
  USER_LOGIN_EXITO
} from '../types';

export const registrarUsuario = (datos, history) => async dispatch => {
  try {
    dispatch(registrarUsuarioIniciado());
    //registrar al usuario
    const usuario = await (
      await axios.post('/api/users/register', { ...datos })
    ).data;
    dispatch(registrarUsuarioExito());
    //logear al usuario
    await dispatch(logearUsuario(usuario));
    history.push('/');
  } catch (error) {
    if (error.response.data) {
      dispatch(registrarUsuarioError(error.response.data));
    } else {
      dispatch(registrarUsuarioError('Algo salio mal!'));
    }
  }
};

const registrarUsuarioIniciado = () => {
  return {
    type: USER_REGISTER_INICIADO
  };
};
const registrarUsuarioExito = () => {
  return {
    type: USER_REGISTER_EXITO
  };
};

const logearUsuario = usuario => {
  return {
    type: USER_LOGIN_EXITO,
    payload: usuario
  };
};
const registrarUsuarioError = error => {
  return {
    type: USER_REGISTER_ERROR,
    payload: error
  };
};
