import axios from 'axios';

import {
  CAMBIAR_FOTO_ERROR,
  CAMBIAR_FOTO_EXITO,
  CAMBIAR_FOTO_INICIO,
} from '../types';

import { cargarPerfilAction } from './CargarPerfilAction';

export const cambiarFoto = (idPerfil, foto) => async dispatch => {
  try {
    dispatch(cambiarFotoInicio());
    const { data: mensaje } = await axios.post(
      '/api/perfiles/cambiarFotoPerfil',
      foto,
      {
        withCredentials: true,
      },
    );
    dispatch(cambiarFotoExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(cambiarFotoError('Algo salió mal!'));
  }
};

const cambiarFotoInicio = () => {
  return {
    type: CAMBIAR_FOTO_INICIO,
  };
};

const cambiarFotoExito = mensaje => {
  return {
    type: CAMBIAR_FOTO_EXITO,
    payload: mensaje,
  };
};

const cambiarFotoError = error => {
  return {
    type: CAMBIAR_FOTO_ERROR,
    payload: error,
  };
};
