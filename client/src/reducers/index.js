import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ErrorsReducer from './ErrorsReducer';

export default combineReducers({
  login: LoginReducer,
  errores: ErrorsReducer
});
