import {
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_EXITO,
  CARGAR_PERFIL_ERROR,
  USER_LOGOUT_EXITO,
  CAMBIAR_FOTO_INICIO,
  CAMBIAR_FOTO_EXITO,
  CAMBIAR_FOTO_ERROR,
  ELIMINAR_FOTO_ERROR,
  ELIMINAR_FOTO_EXITO,
  ELIMINAR_FOTO_INICIO,
  EDITAR_PERFIL_ERROR,
  EDITAR_PERFIL_EXITO,
  EDITAR_PERFIL_INICIO,
} from '../types';

const initialState = {
  cargandoPerfil: false,
  perfil: null,
  mensaje: '',
};

export default function cargarPerfilReducer(state = initialState, action) {
  switch (action.type) {
    case CARGAR_PERFIL_INICIADO:
      return {
        cargandoPerfil: true,
        perfil: null,
      };
    case CARGAR_PERFIL_EXITO:
      return {
        cargandoPerfil: false,
        perfil: action.payload,
      };
    case CARGAR_PERFIL_ERROR:
      return {
        cargandoPerfil: false,
      };
    case USER_LOGOUT_EXITO:
      return {
        cargandoPerfil: false,
        perfil: null,
      };
    case CAMBIAR_FOTO_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case CAMBIAR_FOTO_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case CAMBIAR_FOTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_FOTO_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ELIMINAR_FOTO_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_FOTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case EDITAR_PERFIL_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case EDITAR_PERFIL_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case EDITAR_PERFIL_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
