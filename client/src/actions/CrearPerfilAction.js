import axios from 'axios';

import {
  CREAR_PERFIL_INICIADO,
  CREAR_PERFIL_EXITO,
  CREAR_PERFIL_ERROR,
  USER_LOGIN_EXITO
} from '../types';

export const crearPerfil = (datos, history) => async dispatch => {
  try {
    dispatch(crearPerfilIniciado());
    const datosUsuario = await (
      await axios.post('/api/perfiles/crearPerfil', datos, {
        withCredentials: true
      })
    ).data;
    //actualizar datos del usuario en store con id_perfil
    dispatch({ type: USER_LOGIN_EXITO, payload: datosUsuario });
    dispatch(crearPerfilExito());
    //redireccionar a home
    history.push('/');
  } catch (error) {
    if (error.response.data) {
      dispatch(crearPerfilError());
      console.log('error', error.response.data);
    } else {
      dispatch(crearPerfilError());
      console.log('buceta');
    }
  }
};

const crearPerfilIniciado = () => {
  return {
    type: CREAR_PERFIL_INICIADO
  };
};

const crearPerfilExito = () => {
  return {
    type: CREAR_PERFIL_EXITO
  };
};

const crearPerfilError = () => {
  return {
    type: CREAR_PERFIL_ERROR
  };
};
