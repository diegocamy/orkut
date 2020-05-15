import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import './PanelAjustes.css';

const PanelAjustes = ({ mensaje, cambiarPass, eliminarCuenta, history }) => {
  const [eliminando, setEliminando] = useState(false);

  const validationSchema = yup.object().shape({
    pwdActual: yup.string().required('Debe ingresar su contraseña actual'),
    password: yup
      .string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .required('Debe ingresar una contraseña'),
    repeat_password: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Repita la contraseña'),
  });
  return (
    <div className='PanelAjustes sombra'>
      <h2>Ajustes</h2>
      <div className='cambiar-contra'>
        {mensaje && <p>{mensaje}</p>}
        <p>Cambiar Contraseña</p>
        <Formik
          initialValues={{ pwdActual: '', password: '', repeat_password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await cambiarPass(
              values.password,
              values.repeat_password,
              values.pwdActual,
            );
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='form'>
              <div>
                <div className='divlabel'>
                  <label htmlFor='pwdActual'>Contraseña actual: </label>
                </div>
                <Field
                  type='password'
                  name='pwdActual'
                  placeholder='Contraseña actual'
                />
                <ErrorMessage name='pwdActual' component='span' />
              </div>
              <div>
                <div className='divlabel'>
                  <label htmlFor='password'> Nueva contraseña: </label>
                </div>
                <Field
                  type='password'
                  name='password'
                  placeholder='Nueva contraseña'
                />
                <ErrorMessage name='password' component='span' />
              </div>
              <div>
                <div className='divlabel'>
                  <label htmlFor='repeat_password'>
                    Repetir nueva contraseña:{' '}
                  </label>
                </div>
                <Field
                  type='password'
                  name='repeat_password'
                  placeholder='Repetir nueva contraseña'
                />
                <ErrorMessage name='repeat_password' component='span' />
              </div>
              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'cargando...' : 'cambiar contraseña'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='eliminar-cuenta'>
        <button onClick={e => !eliminando && setEliminando(!eliminando)}>
          {eliminando ? 'seguro?' : 'eliminar cuenta'}
        </button>
        {eliminando && (
          <div className='segurito'>
            <button onClick={e => eliminarCuenta(history)}>si</button>
            <button onClick={e => setEliminando(!eliminando)}>no</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAjustes;
