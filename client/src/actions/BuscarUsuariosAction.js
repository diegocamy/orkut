import axios from 'axios';

import {
  BUSCAR_USUARIOS_INICIO,
  BUSCAR_USUARIOS_EXITO,
  BUSCAR_USUARIOS_ERROR,
} from '../types';

export const buscarUsuarios = (busqueda, history) => async dispatch => {
  try {
    dispatch(buscarUsuariosIniciado(busqueda));
    const resultados = await (
      await axios.post(
        '/api/users/buscarUsuario',
        { busqueda },
        { withCredentials: true },
      )
    ).data;
    await dispatch(buscarUsuariosExito(resultados));
    history.push('/buscar');
  } catch (error) {
    if (error.response.data) {
      dispatch(buscarUsuariosError(error.response.data));
    } else {
      dispatch(buscarUsuariosError('Algo salió mal!'));
    }
  }
};

const buscarUsuariosIniciado = busqueda => {
  return {
    type: BUSCAR_USUARIOS_INICIO,
    payload: busqueda,
  };
};
const buscarUsuariosExito = resultados => {
  return {
    type: BUSCAR_USUARIOS_EXITO,
    payload: resultados,
  };
};
const buscarUsuariosError = error => {
  return {
    type: BUSCAR_USUARIOS_ERROR,
    error: error,
  };
};
