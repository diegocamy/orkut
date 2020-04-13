import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { USER_LOGIN_EXITO, USER_LOGIN_INICIADO } from './types';

import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//checkear si la sesion está activa y el user está logeado para actualizar redux store
const checkearSesion = async () => {
  store.dispatch({ type: USER_LOGIN_INICIADO });
  const respuesta = await (await axios.get('/api/session')).data;
  let usuario;
  if (respuesta.session.passport) {
    usuario = respuesta.session.passport.user;
    if (usuario) {
      await store.dispatch({ type: USER_LOGIN_EXITO, payload: usuario });
    }
  }
};

checkearSesion();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
