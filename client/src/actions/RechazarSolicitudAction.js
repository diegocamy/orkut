import axios from 'axios';

import {
  RECHAZAR_SOLICITUD_INICIO,
  RECHAZAR_SOLICITUD_EXITO,
  RECHAZAR_SOLICITUD_ERROR,
} from '../types';

import { cargarPerfilAction } from './CargarPerfilAction';

export const rechazarSolicitud = (idSolicitud, perfil) => async dispatch => {
  try {
    dispatch(rechazarSolicitudInicio());
    const amigoAceptado = await axios.post(
      `/api/amigos/rechazarSolicitud/${idSolicitud}`,
      null,
      { withCredentials: true },
    );
    dispatch(rechazarSolicitudExito(amigoAceptado.data));
    //luego de aceptar la solicitud recargar las pendientes y el perfil actualizado con el nuevo amigo
    await dispatch(cargarPerfilAction(perfil));
  } catch (error) {
    dispatch(rechazarSolicitudError('No se pudo aceptar la solicitud'));
  }
};

const rechazarSolicitudInicio = () => {
  return {
    type: RECHAZAR_SOLICITUD_INICIO,
  };
};

const rechazarSolicitudExito = mensaje => {
  return {
    type: RECHAZAR_SOLICITUD_EXITO,
    payload: mensaje,
  };
};

const rechazarSolicitudError = error => {
  return {
    type: RECHAZAR_SOLICITUD_ERROR,
    payload: error,
  };
};
