import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGOUT_EXITO,
  USER_LOGIN_ERROR
} from '../types';

const initialState = {
  cargando: false,
  logeado: false,
  usuario: null
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        cargando: true,
        logeado: false,
        usuario: null
      };
    case USER_LOGIN_EXITO:
      return {
        cargando: false,
        logeado: true,
        usuario: action.payload
      };
    case USER_LOGOUT_EXITO:
      return {
        ...state,
        logeado: false,
        usuario: null
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        cargando: false
      };
    default:
      return state;
  }
}
