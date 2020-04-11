import {
  USER_REGISTER_INICIADO,
  USER_REGISTER_EXITO,
  USER_REGISTER_ERROR
} from '../types';

const initialState = {
  cargando: false
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_INICIADO:
      return {
        cargando: true
      };
    case USER_REGISTER_EXITO:
      return {
        cargando: false
      };
    case USER_REGISTER_ERROR:
      return {
        cargando: false
      };
    default:
      return state;
  }
}
