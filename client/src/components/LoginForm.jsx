import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { userLogin } from '../actions/LoginAction';
import './LoginForm.css';

const LoginForm = ({ setFormulario, mensajeError, userLogin, history }) => {
  useEffect(() => {
    return () => {};
  }, []);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Debe ingresar un email valido')
      .required('Debe ingresar un email'),
    password: yup
      .string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .required('Debe ingresar una contraseña')
  });

  return (
    <div className='LoginForm'>
      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      <p>Entrar a Orkut con tu cuenta:</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await userLogin(values.email, values.password, history);
          //setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='form'>
            <div>
              <label htmlFor='email'>Email: </label>
              <Field type='email' name='email' placeholder='Email' />
            </div>
            <ErrorMessage name='email' component='div' className='error-msg' />
            <div>
              <label htmlFor='password'>Password: </label>
              <Field type='password' name='password' placeholder='Password' />
            </div>
            <ErrorMessage
              name='password'
              component='div'
              className='error-msg'
            />
            <button type='submit' disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <a
        href='/'
        onClick={e => {
          e.preventDefault();
          setFormulario(2);
        }}
      >
        Olvidaste tu contraseña?
      </a>
      <div className='registrarse'>
        <p>Aun no tienes una cuenta?</p>
        <a
          href='/'
          onClick={e => {
            e.preventDefault();
            setFormulario(3);
          }}
        >
          REGISTRARSE!
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mensajeError: state.errores.loginError
  };
};

export default connect(mapStateToProps, { userLogin })(LoginForm);
