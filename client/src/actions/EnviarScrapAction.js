import axios from 'axios';

import {
  ENVIAR_SCRAP_INICIO,
  ENVIAR_SCRAP_EXITO,
  ENVIAR_SCRAP_ERROR,
} from '../types';
import { cargarPerfilAction } from './CargarPerfilAction';

export const enviarScrap = (scrap, idReceptor, idPerfil) => async dispatch => {
  try {
    dispatch(enviarScrapInicio());
    const respuesta = await (
      await axios.post(
        `/api/scraps/enviarScrap/${idReceptor}`,
        { scrap },
        { withCredentials: true },
      )
    ).data;
    dispatch(enviarScrapExito(respuesta));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(enviarScrapError('Algo salió mal!'));
  }
};

const enviarScrapInicio = () => {
  return {
    type: ENVIAR_SCRAP_INICIO,
  };
};

const enviarScrapExito = mensaje => {
  return {
    type: ENVIAR_SCRAP_EXITO,
    payload: mensaje,
  };
};

const enviarScrapError = error => {
  return {
    type: ENVIAR_SCRAP_ERROR,
    payload: error,
  };
};
