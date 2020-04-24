import {
  CARGAR_SOLICITUDES_INICIO,
  CARGAR_SOLICITUDES_EXITO,
  CARGAR_SOLICITUDES_ERROR,
  ACEPTAR_SOLICITUD_INICIO,
  ACEPTAR_SOLICITUD_EXITO,
  ACEPTAR_SOLICITUD_ERROR,
  RECHAZAR_SOLICITUD_INICIO,
  RECHAZAR_SOLICITUD_EXITO,
  RECHAZAR_SOLICITUD_ERROR,
  ELIMINAR_AMIGO_ERROR,
  ELIMINAR_AMIGO_EXITO,
  ELIMINAR_AMIGO_INICIO,
  ENVIAR_SOLICITUD_INICIO,
  ENVIAR_SOLICITUD_EXITO,
  ENVIAR_SOLICITUD_ERROR,
} from '../types';

const initialState = {
  solicitudes: [],
  enviadas: [],
  mensaje: '',
};

export default function cargarSolicitudesReducer(state = initialState, action) {
  switch (action.type) {
    case CARGAR_SOLICITUDES_INICIO:
      return {
        ...state,
        solicitudes: [],
        enviadas: [],
      };
    case CARGAR_SOLICITUDES_EXITO:
      return {
        ...state,
        solicitudes: action.payload.recibidas,
        enviadas: action.payload.enviadas,
      };
    case CARGAR_SOLICITUDES_ERROR:
      return {
        ...state,
        solicitudes: [],
        enviadas: [],
      };
    case ACEPTAR_SOLICITUD_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ACEPTAR_SOLICITUD_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ACEPTAR_SOLICITUD_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case RECHAZAR_SOLICITUD_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case RECHAZAR_SOLICITUD_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case RECHAZAR_SOLICITUD_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_AMIGO_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ELIMINAR_AMIGO_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_AMIGO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ENVIAR_SOLICITUD_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ENVIAR_SOLICITUD_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ENVIAR_SOLICITUD_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
