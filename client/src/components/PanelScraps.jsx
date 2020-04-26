import React, { useState } from 'react';
import './PanelScraps.css';
import Scrap from './Scrap';

const mostrarScraps = (scraps, perfil, usuario, enviarScrap, eliminarScrap) => {
  return scraps.map(scrap => {
    return (
      <Scrap
        scrap={scrap}
        key={scrap.id_scrap}
        perfil={perfil}
        usuario={usuario}
        enviarScrap={enviarScrap}
        eliminarScrap={eliminarScrap}
      />
    );
  });
};

const panelScrapsUserLogeado = (
  scraps,
  perfil,
  usuario,
  escrap,
  setEscrap,
  enviarScrap,
  eliminarScrap,
) => {
  return (
    <>
      <div className='enviar-scrap sombra'>
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            onChange={e => setEscrap(e.target.value)}
            name='scrap-mensaje'
            id='scrap-mensaje'
            cols='30'
            rows='10'
            placeholder='Escribe aqui el mensaje que quieres enviar'
          />
        </form>
        <hr />
        <button
          onClick={() => enviarScrap(escrap, perfil.id_usuario, perfil.id)}
        >
          enviar scrap
        </button>
      </div>
      <div className='PanelScraps sombra'>
        <h2>Mis Scraps ({scraps.length})</h2>
        <div className='scraps'>
          {mostrarScraps(scraps, null, usuario, enviarScrap, eliminarScrap)}
        </div>
      </div>
    </>
  );
};

const panelScrapsOtroUser = (
  scraps,
  perfil,
  usuario,
  escrap,
  setEscrap,
  enviarScrap,
  eliminarScrap,
) => {
  return (
    <>
      <div className='enviar-scrap sombra'>
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            onChange={e => setEscrap(e.target.value)}
            name='scrap-mensaje'
            id='scrap-mensaje'
            cols='30'
            rows='10'
            placeholder='Escribe aqui el mensaje que quieres enviar'
          />
        </form>
        <hr />
        <button
          onClick={() => enviarScrap(escrap, perfil.id_usuario, perfil.id)}
        >
          enviar scrap
        </button>
      </div>
      <div className='PanelScraps sombra'>
        <h2>
          Scraps de {perfil.nombre} ({scraps.length})
        </h2>
        <div className='scraps'>
          {mostrarScraps(scraps, perfil, usuario, enviarScrap, eliminarScrap)}
        </div>
      </div>
    </>
  );
};

const PanelScraps = ({
  scraps,
  perfil,
  usuario,
  enviarScrap,
  eliminarScrap,
}) => {
  const [escrap, setEscrap] = useState('');

  if (perfil.id_usuario === usuario.id) {
    return panelScrapsUserLogeado(
      scraps,
      perfil,
      usuario,
      escrap,
      setEscrap,
      enviarScrap,
      eliminarScrap,
    );
  }

  return panelScrapsOtroUser(
    scraps,
    perfil,
    usuario,
    escrap,
    setEscrap,
    enviarScrap,
    eliminarScrap,
  );
};

export default PanelScraps;
