import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './Dashboard.css';
import Navbar from '../components/Navbar';

import { cargarPerfilAction } from '../actions/CargarPerfilAction';

const mostrarAmigos = amigos => {
  return amigos.map(amigo => {
    return (
      <div id={amigo.id}>
        <img src={amigo.foto} alt='foto-amigo' />
        <Link to='#'>
          {amigo.nombre} ({amigo.amigos})
        </Link>
      </div>
    );
  });
};

const Dashboard = ({
  logeado,
  usuario,
  cargandoPerfil,
  perfil,
  history,
  cargarPerfilAction
}) => {
  useEffect(() => {
    if (!logeado) {
      history.push('/');
    }

    if (logeado && !usuario.id_perfil) {
      history.push('/crearPerfil');
    }

    cargarPerfilAction();
  }, [logeado, usuario, history]);

  if (cargandoPerfil) {
    return <h1 style={{ margin: '10px auto' }}>Cargando...</h1>;
  }

  if (logeado && perfil) {
    let sexo;
    if (perfil.genero === 0) {
      sexo = null;
    } else if (perfil.genero === 1) {
      sexo = 'Hombre';
    } else {
      sexo = 'Mujer';
    }

    return (
      <div className='Dashboard'>
        <Navbar />
        <div className='container'>
          <div className='sombra izquierda'>
            <img src={perfil.foto} alt='avatar' />
            <hr />
            <Link to='/dashboard'>{perfil.nombre + ' ' + perfil.apellido}</Link>
            <p>{sexo}</p>
            <p>
              {perfil.ciudad}, {perfil.pais}
            </p>
            <hr />
            <a href='#'>🔨 editar perfil</a>
            <hr />
            <ul>
              <li>
                <a href='#'>🙍‍♂️ perfil</a>
              </li>
              <li>
                <a href='#'>📝 scrapbook</a>
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
          <div className='sombra medio'>
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
                <strong>Visitas a tu perfil:</strong> desde May 2020: 530,
                Semana pasada: 51, Ayer: 11
              </p>
              <p>
                <strong>Visitantes recientes:</strong>{' '}
                <a href='#'>Loco Siadaputa</a>, <a href='#'>Kenga Fresca</a>,
                <a href='#'>Maria Cherabola</a>,
                <a href='#'>Gorda Morsa (LAPERAZITA s2)</a>,
                <a href='#'>Nego Bombero - EL XICO</a>,
                <a href='#'>Sr. Honorable</a>, <a href='#'>Leonardo Bekenino</a>
                ,<a href='#'>Sr. Patalancha || 56cm de pata</a>,
                <a href='#'>Tua Mae</a>, <a href='#'>Tua Irma Bem Puta</a>
              </p>
              <p>
                <strong>Suerte del día:</strong> Sos guampa!
              </p>
            </div>
          </div>
          <div className='sombra derecha'>
            <h3>
              amigos <a href='#'>({perfil.amigos.length})</a>
            </h3>
            <div className='box-amigos'>{mostrarAmigos(perfil.amigos)}</div>
            <hr />
            <div class='ver-todos'>
              <a href='#'>ver todos</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => {
  return {
    logeado: state.login.logeado,
    usuario: state.login.usuario,
    cargandoPerfil: state.login.cargandoPerfil,
    perfil: state.login.perfil
  };
};

export default withRouter(
  connect(mapStateToProps, { cargarPerfilAction })(Dashboard)
);
