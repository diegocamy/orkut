import axios from 'axios';

import {
  ELIMINAR_CUENTA_ERROR,
  ELIMINAR_CUENTA_EXITO,
  ELIMINAR_CUENTA_INICIO,
  USER_LOGOUT_EXITO,
} from '../types';

export const eliminarCuenta = history => async dispatch => {
  try {
    await dispatch({ type: USER_LOGOUT_EXITO });
    dispatch(eliminarCuentaInicio());
    const { data: mensaje } = await axios.post(
      '/api/users/eliminarCuenta',
      {},
      { withCredentials: true },
    );
    await dispatch(eliminarCuentaExito(mensaje));
    history.push('/');
  } catch (error) {
    dispatch(eliminarCuentaError('Ha ocurrido un error'));
  }
};

const eliminarCuentaInicio = () => {
  return {
    type: ELIMINAR_CUENTA_INICIO,
  };
};
const eliminarCuentaExito = mensaje => {
  return {
    type: ELIMINAR_CUENTA_EXITO,
    payload: mensaje,
  };
};
const eliminarCuentaError = error => {
  return {
    type: ELIMINAR_CUENTA_ERROR,
    payload: error,
  };
};
