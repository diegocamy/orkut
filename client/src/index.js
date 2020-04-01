import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';

import rootReducer from './reducers';
import App from './App';
import './index.css';
import { setearAuthorizationHeader } from './utils';
import { USER_LOGIN_EXITO } from './types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//si existe el token
if (localStorage.orkutToken) {
  //quitar la palabra Bearer del token
  const tokenSinBearer = localStorage.orkutToken.split(' ')[1];
  //setear como authorization header en axios
  setearAuthorizationHeader(tokenSinBearer);
  //extraer el usuario del token
  const usuario = jwt.decode(tokenSinBearer);
  //actualizar redux store con el user
  store.dispatch({ type: USER_LOGIN_EXITO, payload: usuario });
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
