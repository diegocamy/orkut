import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_EXITO,
  USER_LOGOUT_EXITO,
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_EXITO
} from '../types';

const initialState = {
  logeado: false,
  usuario: null,
  cargandoPerfil: false,
  perfil: null
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        logeado: false,
        usuario: null,
        cargandoPerfil: false,
        perfil: null
      };
    case USER_LOGIN_EXITO:
      return {
        logeado: true,
        usuario: action.payload,
        cargandoPerfil: false,
        perfil: null
      };
    case CARGAR_PERFIL_INICIADO:
      return {
        ...state,
        cargandoPerfil: true
      };
    case CARGAR_PERFIL_EXITO:
      return {
        ...state,
        cargandoPerfil: false,
        perfil: action.payload
      };
    case USER_LOGOUT_EXITO:
      return {
        logeado: false,
        usuario: null,
        cargandoPerfil: false,
        perfil: null
      };
    default:
      return state;
  }
}
