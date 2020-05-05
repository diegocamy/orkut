import axios from 'axios';

import {
  REGISTRAR_VISITA_ERROR,
  REGISTRAR_VISITA_EXITO,
  REGISTRAR_VISITA_INICIO,
} from '../types';

export const registrarVisita = idUsuarioVisitado => async dispatch => {
  try {
    dispatch(registrarVisitaInicio());
    const { data: mensaje } = await axios.post(
      `/api/perfiles/registrarVisita/${idUsuarioVisitado}`,
      {},
      { withCredentials: true },
    );
    dispatch(registrarVisitaExito(mensaje));
  } catch (error) {
    dispatch(registrarVisitaError('Algo ha salido mal!'));
  }
};

const registrarVisitaInicio = () => {
  return {
    type: REGISTRAR_VISITA_INICIO,
  };
};

const registrarVisitaExito = mensaje => {
  return {
    type: REGISTRAR_VISITA_EXITO,
    payload: mensaje,
  };
};

const registrarVisitaError = error => {
  return {
    type: REGISTRAR_VISITA_ERROR,
    payload: error,
  };
};
