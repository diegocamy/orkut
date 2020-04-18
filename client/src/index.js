import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {
  USER_LOGIN_EXITO,
  USER_LOGIN_INICIADO,
  USER_LOGIN_ERROR,
} from './types';

import { cargarPerfilAction } from './actions/CargarPerfilAction';

import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
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
      if (usuario.id_perfil) {
        await store.dispatch(cargarPerfilAction(usuario.id_perfil));
      }
    }
  } else {
    store.dispatch({ type: USER_LOGIN_ERROR });
  }
};

checkearSesion();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
