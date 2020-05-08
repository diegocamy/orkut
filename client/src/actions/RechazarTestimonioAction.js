import axios from 'axios';

import {
  RECHAZAR_TESTIMONIO_ERROR,
  RECHAZAR_TESTIMONIO_EXITO,
  RECHAZAR_TESTIMONIO_INICIO,
} from '../types';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

export const rechazarTestimonio = (
  idTestimonio,
  idPerfil,
) => async dispatch => {
  try {
    dispatch(rechazarTestimonioInicio());
    const { data: mensaje } = await axios.post(
      `/api/testimonios/rechazar/${idTestimonio}`,
      {},
      { withCredentials: true },
    );
    dispatch(rechazarTestimonioExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(rechazarTestimonioError('Algo ha salido mal!'));
  }
};

const rechazarTestimonioInicio = () => {
  return {
    type: RECHAZAR_TESTIMONIO_INICIO,
  };
};
const rechazarTestimonioExito = mensaje => {
  return {
    type: RECHAZAR_TESTIMONIO_EXITO,
    payload: mensaje,
  };
};
const rechazarTestimonioError = error => {
  return {
    type: RECHAZAR_TESTIMONIO_ERROR,
    payload: error,
  };
};
