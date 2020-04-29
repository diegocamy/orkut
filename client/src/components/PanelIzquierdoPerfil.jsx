import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import './PanelIzquierdoDashboard.css';
import noavatar from '../img/noavatar.png';
import './EnviarSolicitud.css';

import { aceptarSolicitud } from '../actions/AceptarSolicitudAction';
import { rechazarSolicitud } from '../actions/RechazarSolicitudAction';
import { eliminarAmistad } from '../actions/EliminarAmistadAction';
import { enviarSolicitud } from '../actions/EnviarSoliciudAction';
import { cambiarFoto } from '../actions/CambiarFotoAction';
import { eliminarFoto } from '../actions/EliminarFotoAction';

const panelDashboard = (perfil, sexo, match, cambiarFoto, eliminarFoto) => (
  <div className='PanelIzquierdoDashboard sombra'>
    <img src={perfil.foto || noavatar} alt='avatar' />
    {match && match.path === '/editarPerfil' && (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor='cambiar-foto' className='enlace'>
            Cambiar Foto
          </label>
          <input
            type='file'
            id='cambiar-foto'
            multiple={false}
            style={{ display: 'none' }}
            onChange={e => {
              const datos = new FormData();
              datos.append('foto', e.target.files[0]);
              cambiarFoto(perfil.id, datos);
            }}
          />
        </form>
        <button className='enlace' onClick={e => eliminarFoto(perfil.id)}>
          Borrar Foto
        </button>
      </div>
    )}
    <hr />
    <Link to='/dashboard'>{perfil.nombre + ' ' + perfil.apellido}</Link>
    <p>{sexo}</p>
    <p>
      {perfil.ciudad}, {perfil.pais}
    </p>
    <hr />
    <Link to='/editarPerfil'>🔨 editar perfil</Link>
    <hr />
    <ul>
      <li>
        <Link to='/dashboard'>🙍‍♂️ perfil</Link>
      </li>
      <li>
        <Link to={`/scrapbook/${perfil.id}`}>📝 scrapbook</Link>
      </li>
      <li>
        <a href='#'>👥 amigos</a>
      </li>
      <li>
        <a href='#'>🌞 testimonios</a>
      </li>
      <li>
        <a href='#'>🔧 ajustes</a>
      </li>
    </ul>
    <hr />
  </div>
);

const panelPerfil = (
  perfil,
  sexo,
  usuario,
  solicitudes,
  aceptarSolicitud,
  rechazarSolicitud,
  eliminarAmistad,
  open,
  close,
  showDialog,
  mensaje,
  setMensaje,
  enviarSolicitud,
  enviadas,
) => {
  let sonAmigos;

  if (perfil && perfil.amigos.length > 0) {
    sonAmigos = perfil.amigos.find(
      amigo => Number(amigo.id) === Number(usuario.id),
    );
  }

  let solicitudExistente;
  let solicitudEnviadaExistente;

  if (solicitudes && solicitudes.length > 0) {
    solicitudExistente = solicitudes.find(
      solicitud => Number(solicitud.id_perfil) === Number(perfil.id),
    );
  }

  if (enviadas && enviadas.length > 0) {
    solicitudEnviadaExistente = enviadas.find(
      solicitud => Number(solicitud.id_perfil) === Number(perfil.id),
    );
  }

  return (
    <div className='PanelIzquierdoDashboard sombra'>
      {/* MODAL PARA EL MENSAJE DE LA INVITACION */}
      <Dialog
        className='EnviarSolicitud sombra'
        isOpen={showDialog}
        onDismiss={close}
        aria-label='Modal mensaje invitacion'
        perfil={perfil}
        mensaje={mensaje}
      >
        <h4>Enviar solicitud de amistad</h4>
        <img src={perfil.foto || noavatar} alt='foto-perfil' />
        <p>
          Por favor proporciona un poco de información para ayudar a{' '}
          <strong>{perfil.nombre}</strong> a saber quién eres!
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <textarea
            name='mensaje'
            value={mensaje}
            id='mensaje'
            cols='30'
            rows='3'
            onChange={e => {
              // LIMITE DE 100 CARACTERES
              if (e.target.value.length + 1 <= 100) {
                setMensaje(e.target.value);
              } else {
                setMensaje(e.target.value.substring(0, 100));
              }
            }}
          />
        </form>
        <p>Caracteres restantes: {100 - mensaje.length}</p>
        <div>
          <button
            onClick={() => {
              //enviar invitacion
              close();
              enviarSolicitud(mensaje, perfil.id_usuario, perfil.id);
            }}
          >
            enviar
          </button>
          <button
            onClick={() => {
              close();
            }}
          >
            cancelar
          </button>
        </div>
      </Dialog>
      {/* FIN DEL MODAL PARA MENSAJE DE INVITACION */}

      <img src={perfil.foto || noavatar} alt='avatar' />
      <hr />
      <Link to='/dashboard'>{perfil.nombre + ' ' + perfil.apellido}</Link>
      <p>{sexo}</p>
      <p>
        {perfil.ciudad}, {perfil.pais}
      </p>
      <hr />
      {solicitudExistente ? (
        <>
          <a
            href='#'
            onClick={e => {
              e.preventDefault();
              aceptarSolicitud(solicitudExistente.id_solicitud, perfil.id);
            }}
          >
            🙋‍♂️ aceptar solicitud
          </a>
          <br />
          <a
            href='#'
            onClick={e => {
              e.preventDefault();
              rechazarSolicitud(solicitudExistente.id_solicitud, perfil.id);
            }}
          >
            🙅‍♂️ rechazar solicitud
          </a>
        </>
      ) : solicitudEnviadaExistente ? (
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            rechazarSolicitud(
              solicitudEnviadaExistente.id_solicitud,
              perfil.id,
            );
          }}
        >
          ❌ cancelar solicitud
        </a>
      ) : sonAmigos ? (
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            eliminarAmistad(perfil.id, perfil.id_usuario);
          }}
        >
          👤 eliminar amigo/a
        </a>
      ) : (
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            open();
          }}
        >
          🙍‍♂️ añadir como amigo/a
        </a>
      )}
      <hr />
      <ul>
        <li>
          <Link to={`/perfil/${perfil.id}`}>🙍‍♂️ perfil</Link>
        </li>
        <li>
          <Link to={`/scrapbook/${perfil.id}`}>📝 scrapbook</Link>
        </li>
        <li>
          <a href='#'>🌞 testimonios</a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

const PanelIzquierdoPerfil = ({
  perfil,
  usuario,
  solicitudes,
  aceptarSolicitud,
  rechazarSolicitud,
  eliminarAmistad,
  enviarSolicitud,
  enviadas,
  cambiarFoto,
  eliminarFoto,
  match,
}) => {
  let sexo;
  if (perfil.genero === 0) {
    sexo = null;
  } else if (perfil.genero === 1) {
    sexo = 'Hombre';
  } else {
    sexo = 'Mujer';
  }

  const [showDialog, setShowDialog] = React.useState(false);
  const [mensaje, setMensaje] = React.useState('');
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  if (perfil && usuario && perfil.id === usuario.id_perfil) {
    return panelDashboard(perfil, sexo, match, cambiarFoto, eliminarFoto);
  } else {
    return panelPerfil(
      perfil,
      sexo,
      usuario,
      solicitudes,
      aceptarSolicitud,
      rechazarSolicitud,
      eliminarAmistad,
      open,
      close,
      showDialog,
      mensaje,
      setMensaje,
      enviarSolicitud,
      enviadas,
    );
  }
};

export default connect(null, {
  aceptarSolicitud,
  rechazarSolicitud,
  eliminarAmistad,
  enviarSolicitud,
  cambiarFoto,
  eliminarFoto,
})(PanelIzquierdoPerfil);
