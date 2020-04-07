import {
  USER_LOGIN_INICIADO,
  USER_LOGIN_ERROR,
  USER_LOGOUT_INICIADO,
  USER_LOGOUT_ERROR
} from '../types';

const initialState = {
  loginError: '',
  logoutError: ''
};

export default function ErrorsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_INICIADO:
      return {
        ...state,
        loginError: ''
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case USER_LOGOUT_INICIADO:
      return {
        ...state,
        logoutError: ''
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        logoutError: action.payload
      };

    default:
      return state;
  }
}
