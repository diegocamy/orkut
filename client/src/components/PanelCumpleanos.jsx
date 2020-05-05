import React from 'react';

import { Link } from 'react-router-dom';

import noAvatar from '../img/noavatar.png';
import './PanelCumpleanos.css';

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

const mostrarCumpleaneros = cumpleaneros => {
  const cumpleaneritos = cumpleaneros.map(cumpleano => {
    const fecha = new Date(cumpleano.fecha_nacimiento);
    const fechaString = fecha.getDate() + ' ' + meses[fecha.getMonth()];
    return (
      <div className='cumpleanero' key={cumpleano.id_perfil}>
        <img src={cumpleano.foto || noAvatar} alt='foto-perfil' />
        <Link to={`/perfil/${cumpleano.id_perfil}`}>{cumpleano.nombre}</Link>
        {new Date().getDate() === fecha.getDate() ? (
          <div>
            <p style={{ fontWeight: 'bold' }}>hoy</p>
            <Link to={`/scrapbook/${cumpleano.id_perfil}`}>
              dejale un scrap
            </Link>
          </div>
        ) : (
          <p>{fechaString}</p>
        )}
      </div>
    );
  });

  return cumpleaneritos;
};

const PanelCumpleanos = ({ cumpleanos }) => {
  return (
    <div className='PanelCumpleanos sombra'>
      <p>proximos cumpleaños</p>
      <div className='cumples-flex'>{mostrarCumpleaneros(cumpleanos)}</div>
    </div>
  );
};

export default PanelCumpleanos;
