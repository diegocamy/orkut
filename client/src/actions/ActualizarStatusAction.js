import axios from 'axios';

import {
  ACTUALIZAR_STATUS_ERROR,
  ACTUALIZAR_STATUS_INICIO,
  ACTUALIZAR_STATUS_EXITO,
} from '../types';
import { cargarPerfilAction } from './CargarPerfilAction';

export const actualizarStatus = (status, idPerfil) => async dispatch => {
  try {
    dispatch(actualizarStatusInicio());
    const { data: mensaje } = await axios.post(
      '/api/perfiles/status',
      { status },
      { withCredentials: true },
    );
    dispatch(actualizarStatusExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(actualizarStatusError('Algo salio mal!'));
  }
};

const actualizarStatusInicio = () => {
  return { type: ACTUALIZAR_STATUS_INICIO };
};

const actualizarStatusExito = mensaje => {
  return { type: ACTUALIZAR_STATUS_EXITO, payload: mensaje };
};

const actualizarStatusError = error => {
  return { type: ACTUALIZAR_STATUS_ERROR, payload: error };
};
