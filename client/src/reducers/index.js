import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ErrorsReducer from './ErrorsReducer';
import buscarReducer from './BuscarReducer';
import registerReducer from './RegisterReducer';
import crearPerfilReducer from './CrearPerfilReducer';
import cargarPerfilReducer from './PerfilReducer';

export default combineReducers({
  login: LoginReducer,
  perfil: cargarPerfilReducer,
  errores: ErrorsReducer,
  crearPerfil: crearPerfilReducer,
  buscar: buscarReducer,
  registro: registerReducer
});
