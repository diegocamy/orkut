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

const cargarDatosPerfil = perfil => {
//fecha de cumpleaños
const dia = new Date(perfil.fecha_nacimiento).getDate()
let mes = new Date(perfil.fecha_nacimiento).toLocaleString('default',{month: 'long'});
mes = mes[0].toUpperCase() + mes.slice(1,mes.length);

const datos = {};
datos.cumple = ['Cumpleaños:', dia + ' de ' + mes];
datos.ciudad = ['Ciudad:',perfil.ciudad];
datos.pais = ['Pais:',perfil.pais];

const datosPerfil = [];
let i = 0;
for (const key in datos) {
  if (datos.hasOwnProperty(key)) {
    const element = datos[key];
    const markup = (
    <li key={i}>
      <div>
        <p>{element[0]}</p>
      </div>
      <div>
        <p>{element[1]}</p>
      </div>
    </li>
  );
  datosPerfil.push(markup)
  }
  i++;
}

return datosPerfil
}

const estadisticasPerfil = perfil => {
  
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
            {cargarDatosPerfil(perfil)}
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
