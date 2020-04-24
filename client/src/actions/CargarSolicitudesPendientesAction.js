import axios from 'axios';

import {
  CARGAR_SOLICITUDES_INICIO,
  CARGAR_SOLICITUDES_EXITO,
  CARGAR_SOLICITUDES_ERROR,
} from '../types';

export const cargarSolicitudesPendientes = () => async dispatch => {
  try {
    dispatch(cargarSolicitudesInicio());
    const recibidasPendientes = await axios.get(
      '/api/amigos/verSolicitudesPendientes',
      { withCredentials: true },
    );
    const enviadasPendientes = await axios.get(
      '/api/amigos/verSolicitudesEnviadasPendientes',
      { withCredentials: true },
    );
    let todasSolicitudes = {};
    todasSolicitudes.recibidas = recibidasPendientes.data;
    todasSolicitudes.enviadas = enviadasPendientes.data;

    dispatch(cargarSolicitudesExito(todasSolicitudes));
  } catch (error) {
    if (error.response.data) {
      dispatch(cargarSolicitudesError(error.response.data));
    } else {
      dispatch(cargarSolicitudesError('Algo salió mal!'));
    }
  }
};

const cargarSolicitudesInicio = () => {
  return {
    type: CARGAR_SOLICITUDES_INICIO,
  };
};

const cargarSolicitudesExito = solicitudes => {
  return {
    type: CARGAR_SOLICITUDES_EXITO,
    payload: solicitudes,
  };
};

const cargarSolicitudesError = error => {
  return {
    type: CARGAR_SOLICITUDES_ERROR,
    payload: error,
  };
};
