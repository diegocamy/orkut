import axios from 'axios';

import {
  ACEPTAR_SOLICITUD_INICIO,
  ACEPTAR_SOLICITUD_EXITO,
  ACEPTAR_SOLICITUD_ERROR,
} from '../types';

import { cargarPerfilAction } from './CargarPerfilAction';

export const aceptarSolicitud = (idSolicitud, perfil) => async dispatch => {
  try {
    dispatch(aceptarSolicitudInicio());
    const amigoAceptado = await axios.post(
      `/api/amigos/aceptarSolicitud/${idSolicitud}`,
      null,
      { withCredentials: true },
    );
    dispatch(aceptarSolicitudExito(amigoAceptado.data));
    //luego de aceptar la solicitud recargar las pendientes y el perfil actualizado con el nuevo amigo
    await dispatch(cargarPerfilAction(perfil));
  } catch (error) {
    dispatch(aceptarSolicitudError('No se pudo aceptar la solicitud'));
  }
};

const aceptarSolicitudInicio = () => {
  return {
    type: ACEPTAR_SOLICITUD_INICIO,
  };
};

const aceptarSolicitudExito = mensaje => {
  return {
    type: ACEPTAR_SOLICITUD_EXITO,
    payload: mensaje,
  };
};

const aceptarSolicitudError = error => {
  return {
    type: ACEPTAR_SOLICITUD_ERROR,
    payload: error,
  };
};
