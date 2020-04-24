import axios from 'axios';

import {
  ENVIAR_SOLICITUD_INICIO,
  ENVIAR_SOLICITUD_EXITO,
  ENVIAR_SOLICITUD_ERROR,
} from '../types';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

export const enviarSolicitud = (
  mensaje,
  idUsuario2,
  idPerfil,
) => async dispatch => {
  try {
    dispatch(enviarSolicitudInicio());
    const respuesta = axios.post(
      `/api/amigos/enviarSolicitud/${idUsuario2}`,
      { mensaje },
      { withCredentials: true },
    );
    await dispatch(enviarSolicitudExito(respuesta.data));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(enviarSolicitudError('Error al enviar la solicitud'));
  }
};

const enviarSolicitudInicio = () => {
  return {
    type: ENVIAR_SOLICITUD_INICIO,
  };
};

const enviarSolicitudExito = mensaje => {
  return {
    type: ENVIAR_SOLICITUD_EXITO,
    payload: mensaje,
  };
};

const enviarSolicitudError = error => {
  return {
    type: ENVIAR_SOLICITUD_ERROR,
    payload: error,
  };
};
