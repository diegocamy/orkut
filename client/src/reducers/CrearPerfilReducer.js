import {
  CREAR_PERFIL_INICIADO,
  CREAR_PERFIL_EXITO,
  CREAR_PERFIL_ERROR
} from '../types';

const initialState = {
  cargando: false
};

export default function crearPerfilReducer(state = initialState, action) {
  switch (action.type) {
    case CREAR_PERFIL_INICIADO:
      return {
        cargando: true
      };
    case CREAR_PERFIL_EXITO:
      return {
        cargando: false
      };
    case CREAR_PERFIL_ERROR:
      return {
        cargando: false
      };
    default:
      return state;
  }
}
