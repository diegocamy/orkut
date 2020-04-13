import React from 'react';
import { Link } from 'react-router-dom';

import './PanelBusqueda.css';
import noavatar from '../img/noavatar.png';

const usuariosEncontrados = usuarios => {
  return usuarios.map(usuario => {
    return (
      <React.Fragment key={usuario.id_usuario}>
        <div className='usuario'>
          <div className='foto'>
            <img src={usuario.foto || noavatar} alt='foto' />
          </div>
          <div className='datos'>
            <Link to='#'>
              {usuario.nombre} {usuario.apellido}
            </Link>
            <p>{usuario.ciudad}</p>
            <p>{usuario.pais}</p>
            <div>
              <p>📝 235 scraps</p>
              <p>🙍‍♂️ 25 amigos en comun</p>
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  });
};

const PanelBusqueda = ({ buscar }) => {
  return (
    <div className='PanelBusqueda sombra'>
      <h2>Mostrando resultados para {buscar.busqueda}</h2>
      <p className='migas'>
        <Link to='/dashboard'>Home</Link> > Buscar
      </p>
      <form action=''>
        <label htmlFor='buscar' placeholder='Buscar de nuevo' />
        <input type='text' />
        <button>Buscar</button>
      </form>
      <hr />
      <div className='numero-resultados'>
        <span>
          <strong>1 - 12</strong> de <strong>{buscar.resultados.length}</strong>{' '}
          resultados
        </span>
        <span>1 2 3 4 5 ></span>
      </div>
      <hr />
      <div className='resultados'>{usuariosEncontrados(buscar.resultados)}</div>
    </div>
  );
};

export default PanelBusqueda;
