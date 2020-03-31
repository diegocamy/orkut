import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGIN_ERROR
} from '../types';

const initialState = {
  cargando: false,
  error: ''
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        cargando: true,
        error: ''
      };
    case USER_LOGIN_EXITO:
      return {
        cargando: false,
        error: ''
      };
    case USER_LOGIN_ERROR:
      return {
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
