import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const ResetForm = ({ setFormulario }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Debe ingresar un email valido')
      .required('Debe ingresar un email')
  });

  return (
    <div className='LoginForm'>
      <p>Reestablecer tu contraseña: </p>
      <Formik
        initialValues={{ email: '' }}
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
              <label htmlFor='email'>Tu email: </label>
              <Field type='email' name='email' placeholder='Email' />
            </div>
            <ErrorMessage name='email' component='div' className='error-msg' />
            <button type='submit' disabled={isSubmitting}>
              Enviar
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

export default ResetForm;
