import {
  ELIMINAR_CUENTA_ERROR,
  ELIMINAR_CUENTA_EXITO,
  ELIMINAR_CUENTA_INICIO,
} from '../types';

const initialState = {
  mensaje: '',
};

export default function eliminarCuentaReducer(state = initialState, action) {
  switch (action.type) {
    case ELIMINAR_CUENTA_INICIO:
      return {
        mensaje: '',
      };
    case ELIMINAR_CUENTA_EXITO:
      return {
        mensaje: action.payload,
      };
    case ELIMINAR_CUENTA_ERROR:
      return {
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
