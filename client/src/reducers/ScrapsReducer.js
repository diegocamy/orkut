import {
  CARGAR_SCRAPS_INICIO,
  CARGAR_SCRAPS_EXITO,
  CARGAR_SCRAPS_ERROR,
  ENVIAR_SCRAP_INICIO,
  ENVIAR_SCRAP_ERROR,
  ENVIAR_SCRAP_EXITO,
  ELIMINAR_SCRAP_INICIO,
  ELIMINAR_SCRAP_EXITO,
  ELIMINAR_SCRAP_ERROR,
} from '../types';

const initialState = {
  scraps: [],
  mensaje: '',
};

export default function scrapsReducer(state = initialState, action) {
  switch (action.type) {
    case CARGAR_SCRAPS_INICIO:
      return {
        scraps: [],
      };
    case CARGAR_SCRAPS_EXITO:
      return {
        scraps: action.payload,
      };
    case CARGAR_SCRAPS_ERROR:
      return {
        scraps: [],
      };
    case ENVIAR_SCRAP_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ENVIAR_SCRAP_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ENVIAR_SCRAP_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_SCRAP_INICIO:
      return {
        ...state,
        mensaje: '',
      };
    case ELIMINAR_SCRAP_EXITO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_SCRAP_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
