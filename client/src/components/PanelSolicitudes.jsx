import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './PanelSolicitudes.css';
import noAvatar from '../img/noavatar.png';

import { aceptarSolicitud } from '../actions/AceptarSolicitudAction';
import { rechazarSolicitud } from '../actions/RechazarSolicitudAction';

const mostrarSolicitudes = (
  solicitudes,
  aceptarSolicitud,
  perfil,
  rechazarSolicitud,
) => {
  return solicitudes.map(solicitud => {
    return (
      <div key={solicitud.id_solicitud} className='solicitud'>
        <div className='foto'>
          <img
            src={solicitud.foto ? solicitud.foto : noAvatar}
            alt='foto-perfil'
          />
        </div>
        <div className='datos'>
          <p>
            <Link to={`/perfil/${solicitud.id_perfil}`}>
              {solicitud.nombre + ' ' + solicitud.apellido}
            </Link>{' '}
            {`<${solicitud.email}>`}
          </p>
          <p>{solicitud.mensaje}</p>
          <br />
          <p>Es {solicitud.nombre} tu amigo/a?</p>
          <div className='div'>
            <button
              onClick={e => aceptarSolicitud(solicitud.id_solicitud, perfil.id)}
            >
              si
            </button>
            <button
              onClick={e =>
                rechazarSolicitud(solicitud.id_solicitud, perfil.id)
              }
            >
              no
            </button>
          </div>
        </div>
      </div>
    );
  });
};

const PanelSolicitudes = ({
  solicitudes,
  aceptarSolicitud,
  rechazarSolicitud,
  perfil,
}) => {
  return (
    <div className='PanelSolicitudes sombra'>
      <p>
        <strong>solicitudes de amistad ({solicitudes.length})</strong>
      </p>
      {mostrarSolicitudes(
        solicitudes,
        aceptarSolicitud,
        perfil,
        rechazarSolicitud,
      )}
    </div>
  );
};

export default connect(null, { aceptarSolicitud, rechazarSolicitud })(
  PanelSolicitudes,
);
