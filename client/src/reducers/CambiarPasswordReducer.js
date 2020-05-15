import {
  CAMBIAR_PASS_ERROR,
  CAMBIAR_PASS_EXITO,
  CAMBIAR_PASS_INICIO,
  CARGAR_PERFIL_INICIADO,
} from '../types';

const initialState = {
  mensaje: '',
};

export default function cambiarPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CAMBIAR_PASS_INICIO:
      return {
        mensaje: '',
      };
    case CAMBIAR_PASS_EXITO:
      return {
        mensaje: action.payload,
      };
    case CAMBIAR_PASS_ERROR:
      return {
        mensaje: action.payload,
      };
    case CARGAR_PERFIL_INICIADO:
      return {
        mensaje: '',
      };
    default:
      return state;
  }
}
