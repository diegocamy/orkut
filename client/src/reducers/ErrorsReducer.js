import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_ERROR,
  USER_LOGOUT_INICIADO,
  USER_LOGOUT_ERROR,
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_ERROR,
  BUSCAR_USUARIOS_INICIO,
  BUSCAR_USUARIOS_ERROR,
  USER_REGISTER_INICIADO,
  USER_REGISTER_ERROR
} from '../types';

const initialState = {
  loginError: '',
  logoutError: '',
  perfilError: '',
  buscarError: '',
  registerError: ''
};

export default function ErrorsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        ...state,
        loginError: ''
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case USER_LOGOUT_INICIADO:
      return {
        ...state,
        logoutError: ''
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        logoutError: action.payload
      };
    case CARGAR_PERFIL_INICIADO:
      return {
        ...state,
        perfilError: ''
      };
    case CARGAR_PERFIL_ERROR:
      return {
        ...state,
        perfilError: action.payload
      };
    case BUSCAR_USUARIOS_INICIO:
      return {
        ...state,
        buscarError: ''
      };
    case BUSCAR_USUARIOS_ERROR:
      return {
        ...state,
        buscarError: action.payload
      };
    case USER_REGISTER_INICIADO:
      return {
        ...state,
        registerError: ''
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload
      };

    default:
      return state;
  }
}
