import axios from 'axios';

import {
  ELIMINAR_TESTIMONIO_ERROR,
  ELIMINAR_TESTIMONIO_EXITO,
  ELIMINAR_TESTIMONIO_INICIO,
} from '../types';
import { cargarPerfilAction } from './CargarPerfilAction';

export const eliminarTestimonio = (
  idTestimonio,
  idPerfil,
) => async dispatch => {
  try {
    dispatch(eliminarTestimonioInicio());
    const { data: mensaje } = await axios.post(
      `/api/testimonios/eliminar/${idTestimonio}`,
      null,
      {
        withCredentials: true,
      },
    );
    dispatch(eliminarTestimonioExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(eliminarTestimonioError('Algo salió mal!'));
  }
};

const eliminarTestimonioInicio = () => {
  return {
    type: ELIMINAR_TESTIMONIO_INICIO,
  };
};

const eliminarTestimonioExito = mensaje => {
  return {
    type: ELIMINAR_TESTIMONIO_EXITO,
    payload: mensaje,
  };
};

const eliminarTestimonioError = error => {
  return {
    type: ELIMINAR_TESTIMONIO_ERROR,
    payload: error,
  };
};
