import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registrarUsuario } from '../actions/RegistarAction';

const RegisterForm = ({
  setFormulario,
  mensajeError,
  registrarUsuario
}) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Debe ingresar un email valido')
      .required('Debe ingresar un email'),
    password: yup
      .string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .required('Debe ingresar una contraseña'),
    repeat_password: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Repita la contraseña')
  });

  return (
    <div className='LoginForm'>
      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      <p>Registrarse: </p>
      <Formik
        initialValues={{ email: '', password: '', repeat_password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          await registrarUsuario(values);
          setSubmitting(false)
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
            <div>
              <label htmlFor='repeat_password'>Repetir Pwd: </label>
              <Field
                type='password'
                name='repeat_password'
                placeholder='Repetir Password'
              />
            </div>
            <ErrorMessage
              name='repeat_password'
              component='div'
              className='error-msg'
            />
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>
      <p>Ya tienes una cuenta?</p>
      <a
        href='/'
        onClick={e => {
          e.preventDefault();
          setFormulario(1);
        }}
      >
        Ingresar
      </a>
      <div className='registrarse'>
        <a
          href='/'
          onClick={e => {
            e.preventDefault();
            setFormulario(2);
          }}
        >
          Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mensajeError: state.errores.registerError
  };
};

export default withRouter(
  connect(mapStateToProps, { registrarUsuario })(RegisterForm)
);
