import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import noAvatar from '../img/noavatar.png';

import './Scrap.css';

const Scrap = ({ scrap, perfil, usuario, enviarScrap, eliminarScrap }) => {
  const [respondiendo, setRespondiendo] = useState(false);
  const [escrap, setEscrap] = useState('');
  return (
    <div className='scrap'>
      <div className='foto'>
        <img src={scrap.foto || noAvatar} alt='avatar' />
      </div>
      <div className='contenido'>
        <div className='superior'>
          <Link to={`/perfil/${scrap.id_perfil}`}>
            {scrap.nombre}
            <span style={{ color: 'black' }}>:</span>
          </Link>
          <div>
            <p>{new Date(scrap.fecha).toLocaleString()}</p>
            {scrap.emisor == usuario.id ? (
              <button
                onClick={e => {
                  eliminarScrap(scrap.id_scrap, usuario.id_perfil);
                }}
              >
                eliminar
              </button>
            ) : perfil ? null : (
              <button
                onClick={e => {
                  eliminarScrap(scrap.id_scrap, usuario.id_perfil);
                }}
              >
                eliminar
              </button>
            )}
          </div>
        </div>
        {parse(scrap.mensaje)}
        <br />
        {perfil ? null : respondiendo ? (
          <div>
            <form onSubmit={e => e.preventDefault()}>
              <textarea
                name='respuesta'
                id='respuesta'
                cols='30'
                rows='10'
                onChange={e => setEscrap(e.target.value)}
              />
            </form>
            <button
              className='btn-enlace'
              onClick={e =>
                enviarScrap(escrap, scrap.emisor, usuario.id_perfil)
              }
            >
              Enviar
            </button>
            <button
              className='btn-enlace'
              onClick={e => setRespondiendo(!respondiendo)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className='btn-responder'
            onClick={e => setRespondiendo(!respondiendo)}
          >
            Responder
          </button>
        )}
      </div>
    </div>
  );
};

export default Scrap;
