import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './PanelTestimonios.css';
import noAvatar from '../img/noavatar.png';

const mostrarTestimonios = (
  testimonios,
  usuario,
  eliminarTestimonio,
  perfil,
) => {
  return testimonios.map(t => {
    return (
      <div key={t.id_testimonio} className='testi'>
        <div className='izquierdita'>
          <img src={t.foto || noAvatar} alt='foto-testimonio' />
        </div>
        <div className='derechita'>
          <div className='cabecera'>
            <Link to={`/perfil/${t.id_perfil}`}>
              {t.nombre + ' ' + t.apellido}
            </Link>
            <div>
              <p>{new Date(t.fecha).toLocaleString()}</p>
              {t.emisor === usuario.id ? (
                <button
                  className='eliminar-btn'
                  onClick={e => eliminarTestimonio(t.id_testimonio, perfil.id)}
                >
                  eliminar
                </button>
              ) : t.receptor === usuario.id ? (
                <button
                  className='eliminar-btn'
                  onClick={e => eliminarTestimonio(t.id_testimonio, perfil.id)}
                >
                  eliminar
                </button>
              ) : null}
            </div>
          </div>
          <p>{t.mensaje}</p>
        </div>
      </div>
    );
  });
};

const PanelTestimonios = ({
  perfil,
  match,
  usuario,
  enviarTestimonio,
  eliminarTestimonio,
}) => {
  const { testimonios, nombre } = perfil;
  const [boton1activo, setBoton1Activo] = useState(true);
  const [boton2activo, setBoton2Activo] = useState(false);
  const [testi, setTesti] = useState('');
  return (
    <div className='deafuera'>
      {perfil &&
      Number(usuario.id_perfil) !== Number(match.params.id_perfil) ? (
        <div className='Escribir-Testi sombra'>
          <h2>Crear testimonio</h2>
          <p className='breadcrumb'>
            <Link to='/dashboard'>Home</Link>
            <span> > </span>
            <Link to={`/perfil/${perfil.id}`}>{perfil.nombre}</Link>
            <span> > Crear testimonio</span>
          </p>
          <p>
            Que tienes para decir sobre{' '}
            <span style={{ fontWeight: 'bold' }}>{perfil.nombre}</span>?
          </p>
          <p>
            Los testimonios serán visibles para cualquier persona que visite el
            perfil de {perfil.nombre}. Los testimonios son sujetos a aprobación.
          </p>
          <div className='celeste'>
            <form onSubmit={e => e.preventDefault()}>
              <label htmlFor='testimoniobox'>tu testimonio</label>
              <textarea
                name='testimoniobox'
                id='testimoniobox'
                cols='30'
                rows='10'
                value={testi}
                onChange={e => setTesti(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={e => {
              enviarTestimonio(perfil.id_usuario, testi, perfil.id);
            }}
          >
            enviar
          </button>
        </div>
      ) : null}

      <div className='PanelTestimonios sombra'>
        <h2>Testimonios de {nombre}</h2>

        {perfil &&
        Number(usuario.id_perfil) === Number(match.params.id_perfil) ? (
          <>
            <button
              className={`${boton1activo ? 'activo' : 'pasivo'}`}
              onClick={e => {
                if (!boton1activo) {
                  setBoton1Activo(!boton1activo);
                  setBoton2Activo(!boton2activo);
                }
              }}
            >
              Mis testimonios
            </button>
            <button
              className={`${boton2activo ? 'activo' : 'pasivo'}`}
              onClick={e => {
                if (!boton2activo) {
                  setBoton1Activo(!boton1activo);
                  setBoton2Activo(!boton2activo);
                }
              }}
            >
              Testimonios enviados
            </button>
          </>
        ) : (
          <button className='activo'>{`Testimonios de ${nombre}`}</button>
        )}

        <hr className='hr_oscurita' />
        <div>
          {boton1activo && !boton2activo
            ? mostrarTestimonios(
                testimonios.aceptados,
                usuario,
                eliminarTestimonio,
                perfil,
              )
            : mostrarTestimonios(
                testimonios.enviados,
                usuario,
                eliminarTestimonio,
                perfil,
              )}
        </div>
      </div>
    </div>
  );
};

export default PanelTestimonios;
