import React from 'react';
import './PanelEstadisticas.css';

import { cargarDatosPerfil } from '../utils';
import PanelSolicitudes from './PanelSolicitudes';
import { Link } from 'react-router-dom';

const estadisticasDashboard = (perfil, solicitudes, scraps) => {
  return (
    <div className='superior'>
      <div className='PanelEstadisticas sombra'>
        <h2>Bienvenido(a), {perfil.nombre}</h2>
        <div className='estadisticas'>
          <div>
            <Link
              to={`/scrapbook/${perfil.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <p>scraps</p>
              <p>📝 {scraps.length}</p>
            </Link>
          </div>
          <div>
            <p>fans</p>
            <p>⭐ 5</p>
          </div>
          <div>
            <p>mensajes</p>
            <p>📩 155</p>
          </div>
        </div>
        <div className='texto'>
          <p>
            <strong>Visitas a tu perfil:</strong> desde May 2020: 530, Semana
            pasada: 51, Ayer: 11
          </p>
          <p>
            <strong>Visitantes recientes:</strong>{' '}
            <a href='#'>Loco Siadaputa</a>, <a href='#'>Kenga Fresca</a>,
            <a href='#'>Maria Cherabola</a>,
            <a href='#'>Gorda Morsa (LAPERAZITA s2)</a>,
            <a href='#'>Nego Bombero - EL XICO</a>,<a href='#'>Sr. Honorable</a>
            , <a href='#'>Leonardo Bekenino</a>,
            <a href='#'>Sr. Patalancha || 56cm de pata</a>,
            <a href='#'>Tua Mae</a>, <a href='#'>Tua Irma Bem Puta</a>
          </p>
          <p>
            <strong>Suerte del día:</strong> Sos guampa!
          </p>
        </div>
      </div>
      {solicitudes && solicitudes.length > 0 ? (
        <PanelSolicitudes solicitudes={solicitudes} perfil={perfil} />
      ) : null}
    </div>
  );
};

const estadisticasPerfil = (perfil, scraps) => {
  return (
    <div className='superior'>
      <div className='PanelEstadisticas sombra'>
        <h2>
          {perfil.nombre} {perfil.apellido}
        </h2>
        <hr style={{ marginBottom: '-15px', width: '97%', margin: 'auto' }} />
        <div className='estadisticas'>
          <div>
            <Link
              to={`/scrapbook/${perfil.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <p>scraps</p>
              <p>📝 {scraps.length}</p>
            </Link>
          </div>
          <div>
            <p>fans</p>
            <p>⭐ 5</p>
          </div>
          <div>
            <p>mensajes</p>
            <p>📩 155</p>
          </div>
        </div>
        <div className='texto'>
          <hr />
          <div className='perfil'>
            <ul>{cargarDatosPerfil(perfil)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const PanelEstadisticas = ({ perfil, usuario, solicitudes, scraps }) => {
  if (perfil && usuario && perfil.id === usuario.id_perfil) {
    return estadisticasDashboard(perfil, solicitudes, scraps);
  } else {
    return estadisticasPerfil(perfil, scraps);
  }
};

export default PanelEstadisticas;
