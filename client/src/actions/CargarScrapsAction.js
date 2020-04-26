import axios from 'axios';

import {
  CARGAR_SCRAPS_INICIO,
  CARGAR_SCRAPS_EXITO,
  CARGAR_SCRAPS_ERROR,
} from '../types';

export const cargarScraps = idUsuario => async dispatch => {
  try {
    dispatch(cargarScrapsIniciado());
    const scraps = await (
      await axios.get(`/api/scraps/cargarScraps/${idUsuario}`)
    ).data;
    dispatch(cargarScrapsExito(scraps));
  } catch (error) {
    dispatch(cargarScrapsError('Algo salió mal'));
  }
};

const cargarScrapsIniciado = () => {
  return {
    type: CARGAR_SCRAPS_INICIO,
  };
};

const cargarScrapsExito = scraps => {
  return {
    type: CARGAR_SCRAPS_EXITO,
    payload: scraps,
  };
};

const cargarScrapsError = error => {
  return {
    type: CARGAR_SCRAPS_ERROR,
    payload: error,
  };
};
