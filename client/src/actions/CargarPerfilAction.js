import axios from 'axios';

import {
  CARGAR_PERFIL_ERROR,
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_EXITO
} from '../types';

export const cargarPerfilAction = () => async dispatch => {
  try {
    dispatch(cargarPerfilIniciado);
    const perfil = await (
      await axios.get('/api/perfiles/cargarDatosPerfil', {
        withCredentials: true
      })
    ).data;
    const amigos = await (
      await axios.get('/api/amigos/verListaAmigos', { withCredentials: true })
    ).data;
    perfil.amigos = amigos;
    dispatch(cargarPerfilExito(perfil));
  } catch (error) {
    if (error.response.data) {
      dispatch(cargarPerfilError(error.response.data));
    } else {
      dispatch(cargarPerfilError('Algo salió mal!'));
    }
  }
};

const cargarPerfilIniciado = () => {
  return {
    type: CARGAR_PERFIL_INICIADO
  };
};

const cargarPerfilExito = perfil => {
  return {
    type: CARGAR_PERFIL_EXITO,
    payload: perfil
  };
};

const cargarPerfilError = error => {
  return {
    type: CARGAR_PERFIL_ERROR,
    payload: error
  };
};
