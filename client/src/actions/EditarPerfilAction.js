import axios from 'axios';

import {
  EDITAR_PERFIL_ERROR,
  EDITAR_PERFIL_EXITO,
  EDITAR_PERFIL_INICIO,
} from '../types';
import { cargarPerfilAction } from './CargarPerfilAction';

export const editarPerfil = (idPerfil, datos) => async dispatch => {
  try {
    dispatch(editarPerfilInicio());
    const { data: mensaje } = await axios.post(
      '/api/perfiles/editarPerfil',
      { ...datos },
      { withCredentials: true },
    );
    dispatch(editarPerfilExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(editarPerfilError('Algo salió mal!'));
  }
};

const editarPerfilInicio = () => {
  return {
    type: EDITAR_PERFIL_INICIO,
  };
};
const editarPerfilExito = mensaje => {
  return {
    type: EDITAR_PERFIL_EXITO,
    payload: mensaje,
  };
};
const editarPerfilError = error => {
  return {
    type: EDITAR_PERFIL_ERROR,
    payload: error,
  };
};
