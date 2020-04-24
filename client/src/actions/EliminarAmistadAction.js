import axios from 'axios';

import {
  ELIMINAR_AMIGO_INICIO,
  ELIMINAR_AMIGO_EXITO,
  ELIMINAR_AMIGO_ERROR,
} from '../types';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

export const eliminarAmistad = (idPerfil, idUsuarioAmigo) => async dispatch => {
  try {
    dispatch(eliminarAmistadIniciado());
    const respuesta = await axios.post(
      `/api/amigos/eliminarAmigo/${idUsuarioAmigo}`,
      null,
      {
        withCredentials: true,
      },
    );
    await dispatch(eliminarAmistadExito(respuesta.data));
    await dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(eliminarAmistadError('Error al eliminar amigo'));
  }
};

const eliminarAmistadIniciado = () => {
  return {
    type: ELIMINAR_AMIGO_INICIO,
  };
};

const eliminarAmistadExito = mensaje => {
  return {
    type: ELIMINAR_AMIGO_EXITO,
    payload: mensaje,
  };
};

const eliminarAmistadError = error => {
  return {
    type: ELIMINAR_AMIGO_ERROR,
    payload: error,
  };
};
