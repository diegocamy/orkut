import {
  ENVIAR_TESTIMONIO_ERROR,
  ENVIAR_TESTIMONIO_INICIO,
  ENVIAR_TESTIMONIO_EXITO,
  ELIMINAR_TESTIMONIO_ERROR,
  ELIMINAR_TESTIMONIO_EXITO,
  ELIMINAR_TESTIMONIO_INICIO,
  RECHAZAR_TESTIMONIO_ERROR,
  RECHAZAR_TESTIMONIO_EXITO,
  RECHAZAR_TESTIMONIO_INICIO,
  ACEPTAR_TESTIMONIO_ERROR,
  ACEPTAR_TESTIMONIO_EXITO,
  ACEPTAR_TESTIMONIO_INICIO,
} from '../types';

const initialState = {
  mensaje: '',
};

export default function testimoniosReducer(state = initialState, action) {
  switch (action.type) {
    case ENVIAR_TESTIMONIO_INICIO:
      return {
        mensaje: '',
      };
    case ENVIAR_TESTIMONIO_EXITO:
      return {
        mensaje: action.payload,
      };
    case ENVIAR_TESTIMONIO_ERROR:
      return {
        mensaje: action.payload,
      };
    case ELIMINAR_TESTIMONIO_INICIO:
      return {
        mensaje: '',
      };
    case ELIMINAR_TESTIMONIO_EXITO:
      return {
        mensaje: action.payload,
      };
    case ELIMINAR_TESTIMONIO_ERROR:
      return {
        mensaje: action.payload,
      };
    case ACEPTAR_TESTIMONIO_INICIO:
      return {
        mensaje: '',
      };
    case ACEPTAR_TESTIMONIO_EXITO:
      return {
        mensaje: action.payload,
      };
    case ACEPTAR_TESTIMONIO_ERROR:
      return {
        mensaje: action.payload,
      };
    case RECHAZAR_TESTIMONIO_INICIO:
      return {
        mensaje: '',
      };
    case RECHAZAR_TESTIMONIO_EXITO:
      return {
        mensaje: action.payload,
      };
    case RECHAZAR_TESTIMONIO_ERROR:
      return {
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
