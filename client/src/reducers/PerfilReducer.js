import {
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_EXITO,
  CARGAR_PERFIL_ERROR
} from '../types';

const initialState = {
  cargandoPerfil: false,
  perfil: null
};

export default function cargarPerfilReducer(state = initialState, action) {
  switch (action.type) {
    case CARGAR_PERFIL_INICIADO:
      return {
        cargandoPerfil: true,
        perfil: null
      };
    case CARGAR_PERFIL_EXITO:
      return {
        cargandoPerfil: false,
        perfil: action.payload
      };
    case CARGAR_PERFIL_ERROR:
      return {
        cargandoPerfil: false
      };
    default:
      return state;
  }
}
