import React from 'react';
import './LoginForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const LoginForm = ({ setFormulario }) => {
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
      <p>Entrar a Orkut con tu cuenta:</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

export default LoginForm;
