import React from 'react';
import './PanelEstadisticas.css';

const PanelEstadisticas = ({ perfil }) => {
  return (
    <div className='PanelEstadisticas sombra'>
      <h2>Bienvenido(a), {perfil.nombre}</h2>
      <div className='estadisticas'>
        <div>
          <p>scraps</p>
          <p>📝 276</p>
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
          <strong>Visitantes recientes:</strong> <a href='#'>Loco Siadaputa</a>,{' '}
          <a href='#'>Kenga Fresca</a>,<a href='#'>Maria Cherabola</a>,
          <a href='#'>Gorda Morsa (LAPERAZITA s2)</a>,
          <a href='#'>Nego Bombero - EL XICO</a>,<a href='#'>Sr. Honorable</a>,{' '}
          <a href='#'>Leonardo Bekenino</a>,
          <a href='#'>Sr. Patalancha || 56cm de pata</a>,<a href='#'>Tua Mae</a>
          , <a href='#'>Tua Irma Bem Puta</a>
        </p>
        <p>
          <strong>Suerte del día:</strong> Sos guampa!
        </p>
      </div>
    </div>
  );
};

export default PanelEstadisticas;
