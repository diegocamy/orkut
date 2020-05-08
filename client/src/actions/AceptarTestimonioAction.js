import axios from 'axios';

import {
  ACEPTAR_TESTIMONIO_ERROR,
  ACEPTAR_TESTIMONIO_EXITO,
  ACEPTAR_TESTIMONIO_INICIO,
} from '../types';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

export const aceptarTestimonio = (idTestimonio, idPerfil) => async dispatch => {
  try {
    dispatch(aceptarTestimonioInicio());
    const { data: mensaje } = await axios.post(
      `/api/testimonios/aceptar/${idTestimonio}`,
      {},
      { withCredentials: true },
    );
    dispatch(aceptarTestimonioExito(mensaje));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(aceptarTestimonioError('Algo ha salido mal!'));
  }
};

const aceptarTestimonioInicio = () => {
  return {
    type: ACEPTAR_TESTIMONIO_INICIO,
  };
};
const aceptarTestimonioExito = mensaje => {
  return {
    type: ACEPTAR_TESTIMONIO_EXITO,
    payload: mensaje,
  };
};
const aceptarTestimonioError = error => {
  return {
    type: ACEPTAR_TESTIMONIO_ERROR,
    payload: error,
  };
};
