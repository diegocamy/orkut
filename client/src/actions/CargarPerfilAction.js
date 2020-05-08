import axios from 'axios';

import {
  CARGAR_PERFIL_ERROR,
  CARGAR_PERFIL_INICIADO,
  CARGAR_PERFIL_EXITO,
} from '../types';
import { cargarSolicitudesPendientes } from './CargarSolicitudesPendientesAction';
import { cargarScraps } from './CargarScrapsAction';

export const cargarPerfilAction = idPerfil => async dispatch => {
  try {
    dispatch(cargarPerfilIniciado());

    const perfil = await (
      await axios.post(
        '/api/perfiles/cargarDatosPerfil',
        { idPerfil },
        {
          withCredentials: true,
        },
      )
    ).data;

    dispatch(cargarScraps(perfil.id_usuario));

    const amigos = await (
      await axios.post(
        '/api/amigos/verListaAmigos',
        { idUsuario: perfil.id_usuario },
        { withCredentials: true },
      )
    ).data;

    const estadisticas = await (
      await axios.get('/api/perfiles/estadisticasVisitas', {
        withCredentials: true,
      })
    ).data;

    const cumpleanos = await (
      await axios.get('/api/perfiles/proximosCumpleanos', {
        withCredentials: true,
      })
    ).data;

    //TESTIMONIOS
    const aceptados = await (
      await axios.get(`/api/testimonios/${perfil.id_usuario}`, {
        withCredentials: true,
      })
    ).data;

    const pendientes = await (
      await axios.get(`/api/testimonios/pendientes/${perfil.id_usuario}`, {
        withCredentials: true,
      })
    ).data;

    const enviados = await (
      await axios.get(`/api/testimonios/enviados/${perfil.id_usuario}`, {
        withCredentials: true,
      })
    ).data;

    perfil.amigos = amigos;
    perfil.estadisticas = estadisticas;
    perfil.cumpleanos = cumpleanos;
    perfil.testimonios = {};
    perfil.testimonios.pendientes = pendientes;
    perfil.testimonios.aceptados = aceptados;
    perfil.testimonios.enviados = enviados;

    dispatch(cargarSolicitudesPendientes());
    dispatch(cargarPerfilExito(perfil));
  } catch (error) {
    if (error.response.data) {
      dispatch(cargarPerfilError(error.response.data));
    } else {
      dispatch(cargarPerfilError('Algo salió mal!'));
    }
  }
};

const cargarPerfilIniciado = () => {
  return {
    type: CARGAR_PERFIL_INICIADO,
  };
};

const cargarPerfilExito = perfil => {
  return {
    type: CARGAR_PERFIL_EXITO,
    payload: perfil,
  };
};

const cargarPerfilError = error => {
  return {
    type: CARGAR_PERFIL_ERROR,
    payload: error,
  };
};
