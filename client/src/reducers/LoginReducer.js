import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGIN_ERROR
} from '../types';

const initialState = {
  cargando: false,
  logeado: false,
  user: {},
  error: ''
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        cargando: true,
        logeado: false,
        user: {},
        error: ''
      };
    case USER_LOGIN_EXITO:
      return {
        cargando: false,
        logeado: true,
        user: action.payload,
        error: ''
      };
    case USER_LOGIN_ERROR:
      return {
        cargando: false,
        logado: false,
        user: {},
        error: action.payload
      };
    default:
      return state;
  }
}
