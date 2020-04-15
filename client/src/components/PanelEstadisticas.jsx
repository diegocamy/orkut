import React from 'react';
import './PanelEstadisticas.css';

const estadisticasDashboard = perfil => {
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

const estadisticasPerfil = perfil => {
  console.log(perfil);
  return (
    <div className='PanelEstadisticas sombra'>
      <h2>
        {perfil.nombre} {perfil.apellido}
      </h2>
      <hr style={{ marginBottom: '-15px', width: '97%', margin: 'auto' }} />
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
        <hr />
        <div className='perfil'>
          <ul>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>asd:</p>
              </div>
              <div>
                <p>
                  bananero bananero bananero bananero bananero bananero bananero
                  bananero bananero
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const PanelEstadisticas = ({ perfil, usuario }) => {
  if (perfil.id === usuario.id_perfil) {
    return estadisticasDashboard(perfil);
  } else {
    return estadisticasPerfil(perfil);
  }
};

export default PanelEstadisticas;
