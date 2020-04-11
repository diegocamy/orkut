import { BUSCAR_USUARIOS_INICIO, BUSCAR_USUARIOS_EXITO } from '../types';

const initialState = {
  cargando: false,
  busqueda: '',
  resultados: []
};

export default function buscarReducer(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_USUARIOS_INICIO:
      return {
        ...state,
        cargando: true,
        busqueda: action.payload
      };
    case BUSCAR_USUARIOS_EXITO:
      return {
        ...state,
        cargando: false,
        resultados: action.payload
      };
    default:
      return state;
  }
}
