import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className='LoginForm'>
      <p>Entrar a Orkut con tu cuenta:</p>
      <form action=''>
        <div>
          <label htmlFor='email'>Email: </label>
          <input type='text' name='email' placeholder='Email' />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input type='password' placeholder='Password' name='password' />
        </div>
      </form>
      <button>Login</button>
      <a href='/'>Olvidaste tu contraseña?</a>
      <div className='registrarse'>
        <p>Aun no tienes una cuenta?</p>
        <a href='/'>REGISTRARSE!</a>
      </div>
    </div>
  );
};

export default LoginForm;
