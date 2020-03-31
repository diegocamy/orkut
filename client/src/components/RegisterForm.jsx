import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const RegisterForm = ({ setFormulario }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Debe ingresar un email valido')
      .required('Debe ingresar un email'),
    password: yup
      .string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .required('Debe ingresar una contraseña'),
    password_2: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Repita la contraseña')
  });

  return (
    <div className='LoginForm'>
      <p>Registrarse: </p>
      <Formik
        initialValues={{ email: '', password: '', password_2: '' }}
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
            <div>
              <label htmlFor='password_2'>Repetir Pwd: </label>
              <Field
                type='password'
                name='password_2'
                placeholder='Repetir Password'
              />
            </div>
            <ErrorMessage
              name='password_2'
              component='div'
              className='error-msg'
            />
            <button type='submit' disabled={isSubmitting}>
              Registrarse
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

export default RegisterForm;
