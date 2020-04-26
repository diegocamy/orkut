import axios from 'axios';

import {
  ELIMINAR_SCRAP_INICIO,
  ELIMINAR_SCRAP_EXITO,
  ELIMINAR_SCRAP_ERROR,
} from '../types';

import { cargarPerfilAction } from './CargarPerfilAction';

export const eliminarScrap = (idScrap, idPerfil) => async dispatch => {
  try {
    dispatch(eliminarScrapInicio());
    const respuesta = await (
      await axios.post(
        `/api/scraps/eliminarScrap/${idScrap}`,
        {},
        { withCredentials: true },
      )
    ).data;
    dispatch(eliminarScrapExito(respuesta));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(eliminarScrapError('Algo salió mal!'));
  }
};

const eliminarScrapInicio = () => {
  return {
    type: ELIMINAR_SCRAP_INICIO,
  };
};

const eliminarScrapExito = mensaje => {
  return {
    type: ELIMINAR_SCRAP_EXITO,
    payload: mensaje,
  };
};

const eliminarScrapError = error => {
  return {
    type: ELIMINAR_SCRAP_ERROR,
    payload: error,
  };
};
