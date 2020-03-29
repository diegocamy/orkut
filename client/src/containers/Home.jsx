import React from 'react';
import './Home.css';
import LoginForm from '../components/LoginForm';

const Home = () => {
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
        <div className='login-container'>
          <LoginForm />
        </div>
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

export default Home;
