import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Home.css';
import LoginForm from '../components/LoginForm';
import ResetForm from '../components/ResetForm';
import RegisterForm from '../components/RegisterForm';

const Home = ({ cargando, logeado, user, history }) => {
  useEffect(() => {
    //si el user esta logeado y tiene un perfil enviarlo al dashboard
    //si no tiene un perfil creado enviarlo a la pagina para crear uno
    if (logeado && user.id_perfil) {
      history.push('/dashboard');
    } else if (logeado && !user.id_perfil) {
      history.push('/crearPerfil');
    }
  }, [cargando, logeado, user, history]);

  const [formulario, setFormulario] = useState(1);

  const renderFormularios = f => {
    if (f === 1) {
      return <LoginForm setFormulario={setFormulario} history={history} />;
    } else if (f === 2) {
      return <ResetForm setFormulario={setFormulario} />;
    } else if (f === 3) {
      return <RegisterForm setFormulario={setFormulario} />;
    }
  };

  if (cargando) {
    return <h1>CARGANDOOO</h1>;
  }

  return (
    <div className='Home'>
      <div className='container'>
        <div className='logo'>
          <h1 className='brand'>orkut</h1>
          <p>
            <span className='violeta'>Conectate</span> con amigos y familiares
            usando scraps y mensajes
          </p>
          <p>
            <span className='violeta'>Descubre</span> personas a través de
            amigos de amigos
          </p>
          <p>
            <span className='violeta'>Comparte</span> tus videos,fotos y
            pasiones en un solo lugar
          </p>
        </div>
        <div className='login-container'>{renderFormularios(formulario)}</div>
      </div>
      <div className='footer'>
        <p>
          &copy; 2020 Orkut - Sitio no oficial -{' '}
          <a
            href='http://github.com/diegocamy'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mi Github
          </a>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cargando: state.login.cargando,
    logeado: state.login.logeado,
    user: state.login.usuario
  };
};

export default withRouter(connect(mapStateToProps, {})(Home));
