import axios from 'axios';

import {
  CAMBIAR_PASS_ERROR,
  CAMBIAR_PASS_EXITO,
  CAMBIAR_PASS_INICIO,
} from '../types';

export const cambiarPass = (
  password,
  password2,
  passwordActual,
) => async dispatch => {
  try {
    dispatch(cambiarPassInicio());
    const { data: mensaje } = await axios.post(
      '/api/users/cambiarPassword',
      { password, password2, passwordActual },
      { withCredentials: true },
    );
    dispatch(cambiarPassExito(mensaje));
  } catch (error) {
    dispatch(cambiarPassError('Ha ocurrido un error'));
  }
};

const cambiarPassInicio = () => {
  return {
    type: CAMBIAR_PASS_INICIO,
  };
};

const cambiarPassExito = mensaje => {
  return {
    type: CAMBIAR_PASS_EXITO,
    payload: mensaje,
  };
};

const cambiarPassError = error => {
  return {
    type: CAMBIAR_PASS_ERROR,
    payload: error,
  };
};
