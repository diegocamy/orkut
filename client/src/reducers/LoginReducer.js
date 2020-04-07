import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGOUT_EXITO
} from '../types';

const initialState = {
  logeado: false,
  usuario: null
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        logeado: false,
        usuario: null
      };
    case USER_LOGIN_EXITO:
      return {
        logeado: true,
        usuario: action.payload
      };
    case USER_LOGOUT_EXITO:
      return {
        logeado: false,
        usuario: null
      };
    default:
      return state;
  }
}
