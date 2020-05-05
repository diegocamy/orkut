import {
  REGISTRAR_VISITA_ERROR,
  REGISTRAR_VISITA_EXITO,
  REGISTRAR_VISITA_INICIO,
} from '../types';

const initialState = {
  mensaje: '',
};

export default function visitasReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRAR_VISITA_INICIO:
      return {
        mensaje: '',
      };
    case REGISTRAR_VISITA_EXITO:
      return {
        mensaje: action.payload,
      };
    case REGISTRAR_VISITA_ERROR:
      return {
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
