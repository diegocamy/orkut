import axios from 'axios';

import {
  ELIMINAR_FOTO_INICIO,
  ELIMINAR_FOTO_EXITO,
  ELIMINAR_FOTO_ERROR,
} from '../types';
import { cargarPerfilAction } from './CargarPerfilAction';

export const eliminarFoto = idPerfil => async dispatch => {
  try {
    dispatch(eliminarFotoInicio());
    const { data: mensaje } = await axios.post(
      '/api/perfiles/eliminarFotoPerfil',
      {},
      { withCredentials: true },
    );
    dispatch(eliminarFotoExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(eliminarFotoError('Algo ha salido mal!'));
  }
};

const eliminarFotoInicio = () => {
  return {
    type: ELIMINAR_FOTO_INICIO,
  };
};

const eliminarFotoExito = mensaje => {
  return {
    type: ELIMINAR_FOTO_EXITO,
    payload: mensaje,
  };
};

const eliminarFotoError = error => {
  return {
    type: ELIMINAR_FOTO_ERROR,
    payload: error,
  };
};
