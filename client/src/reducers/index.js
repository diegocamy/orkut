import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ErrorsReducer from './ErrorsReducer';
import buscarReducer from './BuscarReducer';
import registerReducer from './RegisterReducer';
import crearPerfilReducer from './CrearPerfilReducer';

export default combineReducers({
  login: LoginReducer,
  errores: ErrorsReducer,
  crearPerfil: crearPerfilReducer,
  buscar: buscarReducer,
  registro: registerReducer
});
