import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './PanelEstadisticas.css';

import { cargarDatosPerfil } from '../utils';

import PanelSolicitudes from './PanelSolicitudes';
import PanelCumpleanos from './PanelCumpleanos';

import { actualizarStatus } from '../actions/ActualizarStatusAction';
import { aceptarTestimonio } from '../actions/AceptarTestimonioAction';
import { rechazarTestimonio } from '../actions/RechazarTestimonioAction';
import PanelTestimoniosPendientes from './PanelTestimoniosPendientes';
import PanelTestimoniosPerfil from './PanelTestimoniosPerfil';

const mostrarUltimos10Visitantes = visitantes => {
  const jsxVisitantes = visitantes.map(visitante => (
    <Link key={visitante.id_visita} to={`/perfil/${visitante.id_perfil}`}>
      {visitante.nombre} {visitante.apellido}
    </Link>
  ));

  const jsxConComas = jsxVisitantes.map((visitante, i) => {
    if (i < jsxVisitantes.length - 1) {
      return <span key={i}>{visitante}, </span>;
    } else {
      return visitante;
    }
  });

  return jsxConComas;
};

const estadisticasDashboard = (
  perfil,
  solicitudes,
  scraps,
  status,
  setStatus,
  editando,
  setEditando,
  actualizarStatus,
  aceptarTestimonio,
  rechazarTestimonio,
) => {
  const meses = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  const fechaCreacion = new Date(perfil.creado_el);
  const fechaCreacionString =
    meses[fechaCreacion.getMonth()] + ' ' + fechaCreacion.getFullYear();
  const {
    visitantesUltimas24h,
    visitasTotales,
    visitasUltimaSemana,
    ultimos10Visitantes,
  } = perfil.estadisticas;

  return (
    <div className='superior'>
      <div className='PanelEstadisticas sombra'>
        <h2>Bienvenido(a), {perfil.nombre}</h2>
        {editando ? (
          <div className='status-box'>
            <p className='parrafo-editando'>
              {perfil.estatus || 'Define tu estado aqui'}
            </p>
            <button
              onClick={e => {
                setStatus(perfil.estatus);
                setEditando(!editando);
              }}
            >
              editar
            </button>
          </div>
        ) : (
          <div className='status-box'>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type='text'
                value={status || ''}
                onChange={e => setStatus(e.target.value)}
              />
            </form>
            <div>
              <button
                onClick={e => {
                  if (status.length > 255) {
                    return alert(
                      'El mensaje no puede contener mas de 255 caracteres',
                    );
                  }
                  actualizarStatus(status, perfil.id);
                }}
              >
                guardar
              </button>
              <button onClick={e => setEditando(!editando)}>cancelar</button>
            </div>
          </div>
        )}
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
            <strong>Visitas a tu perfil:</strong> desde {fechaCreacionString}:{' '}
            {visitasTotales}, Semana pasada: {visitasUltimaSemana}, Ayer:{' '}
            {visitantesUltimas24h}
          </p>
          <p>
            <strong>Visitantes recientes:</strong>{' '}
            {mostrarUltimos10Visitantes(ultimos10Visitantes)}
          </p>
          <p>
            <strong>Suerte del día:</strong> Sos guampa!
          </p>
        </div>
      </div>
      {perfil.cumpleanos && perfil.cumpleanos.length > 0 ? (
        <PanelCumpleanos cumpleanos={perfil.cumpleanos} />
      ) : null}
      {solicitudes && solicitudes.length > 0 ? (
        <PanelSolicitudes solicitudes={solicitudes} perfil={perfil} />
      ) : null}
      {perfil.testimonios.pendientes &&
      perfil.testimonios.pendientes.length > 0 ? (
        <PanelTestimoniosPendientes
          testimonios={perfil.testimonios.pendientes}
          perfil={perfil}
          aceptarTestimonio={aceptarTestimonio}
          rechazarTestimonio={rechazarTestimonio}
        />
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
        <p className='breadcrumb'>
          <Link to='/dashboard'>Home</Link> >{' '}
          <span>{perfil.nombre + ' ' + perfil.apellido}</span>
        </p>
        {perfil.estatus && (
          <div className='status-box' style={{ marginBottom: '10px' }}>
            <p>{perfil.estatus}</p>
          </div>
        )}
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
      {perfil.testimonios.aceptados &&
      perfil.testimonios.aceptados.length > 0 ? (
        <PanelTestimoniosPerfil testimonios={perfil.testimonios.aceptados} />
      ) : null}
    </div>
  );
};

const PanelEstadisticas = ({
  perfil,
  usuario,
  solicitudes,
  scraps,
  actualizarStatus,
  aceptarTestimonio,
  rechazarTestimonio,
}) => {
  const [editando, setEditando] = useState(false);
  const [status, setStatus] = useState(' ');

  if (perfil && usuario && perfil.id === usuario.id_perfil) {
    return estadisticasDashboard(
      perfil,
      solicitudes,
      scraps,
      editando,
      setEditando,
      status,
      setStatus,
      actualizarStatus,
      aceptarTestimonio,
      rechazarTestimonio,
    );
  } else {
    return estadisticasPerfil(perfil, scraps);
  }
};

export default connect(null, {
  actualizarStatus,
  aceptarTestimonio,
  rechazarTestimonio,
})(PanelEstadisticas);
