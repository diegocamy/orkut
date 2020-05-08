import axios from 'axios';

import {
  ENVIAR_TESTIMONIO_ERROR,
  ENVIAR_TESTIMONIO_INICIO,
  ENVIAR_TESTIMONIO_EXITO,
} from '../types';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

export const enviarTestimonio = (
  receptor,
  mensaje,
  idPerfil,
) => async dispatch => {
  try {
    dispatch(enviarTestimonioInicio());
    const { data: exito } = await axios.post(
      '/api/testimonios/enviar',
      { receptor, mensaje },
      { withCredentials: true },
    );
    dispatch(enviarTestimonioExito(exito));
    dispatch(cargarPerfilAction(idPerfil));
  } catch (error) {
    dispatch(enviarTestimonioError('Algo ha salido mal!'));
  }
};

const enviarTestimonioInicio = () => {
  return {
    type: ENVIAR_TESTIMONIO_INICIO,
  };
};
const enviarTestimonioExito = mensaje => {
  return {
    type: ENVIAR_TESTIMONIO_EXITO,
    payload: mensaje,
  };
};
const enviarTestimonioError = error => {
  return {
    type: ENVIAR_TESTIMONIO_ERROR,
    payload: error,
  };
};
