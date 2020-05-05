import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ErrorsReducer from './ErrorsReducer';
import buscarReducer from './BuscarReducer';
import registerReducer from './RegisterReducer';
import crearPerfilReducer from './CrearPerfilReducer';
import cargarPerfilReducer from './PerfilReducer';
import cargarSolicitudesReducer from './SolicitudesReducer';
import scrapsReducer from './ScrapsReducer';
import visitasReducer from './VisitasReducer';

export default combineReducers({
  login: LoginReducer,
  perfil: cargarPerfilReducer,
  solicitudes: cargarSolicitudesReducer,
  errores: ErrorsReducer,
  crearPerfil: crearPerfilReducer,
  buscar: buscarReducer,
  registro: registerReducer,
  scraps: scrapsReducer,
  visitas: visitasReducer,
});
