import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ErrorsReducer from './ErrorsReducer';
import buscarReducer from './BuscarReducer';
import registerReducer from './RegisterReducer';

export default combineReducers({
  login: LoginReducer,
  errores: ErrorsReducer,
  buscar: buscarReducer,
  registro: registerReducer
});
