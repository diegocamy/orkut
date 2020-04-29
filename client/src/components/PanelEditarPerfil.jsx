import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as yup from 'yup';

import './CrearPerfilForm.css';

const formatDate = date => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const PanelEditarPerfil = ({ perfil, editarPerfil }) => {
  const schema = yup.object().shape({
    nombre: yup
      .string()
      .max(255, 'Maximo 255 caracteres')
      .min(2, 'Minimo 2 caracteres')
      .required('Debe ingresar un nombre'),
    apellido: yup
      .string()
      .max(255, 'Maximo 255 caracteres')
      .min(2, 'Minimo 2 caracteres')
      .required('Debe ingresar un apellido'),
    genero: yup.number().min(0).max(2),
    pais: yup
      .string()
      .max(255, 'Maximo 255 caracteres')
      .min(2, 'Minimo 2 caracteres')
      .required('Debe ingresar un pais'),
    ciudad: yup
      .string()
      .max(255, 'Maximo 255 caracteres')
      .min(2, 'Minimo 2 caracteres')
      .required('Debe ingresar un ciudad'),
    fechaNacimiento: yup
      .date()
      .required('Debe ingresar una fecha de nacimiento'),
  });

  const fecha_N = formatDate(new Date(perfil.fecha_nacimiento));

  return (
    <div className='CrearPerfilForm sombra margen'>
      <h2>Editar Perfil</h2>
      <Formik
        initialValues={{
          nombre: perfil.nombre,
          apellido: perfil.apellido,
          genero: perfil.genero,
          pais: perfil.pais,
          ciudad: perfil.ciudad,
          fechaNacimiento: fecha_N,
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          //ACTUALIZAR PERFIL
          editarPerfil(perfil.id, values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ul>
              <li>
                <div>
                  <label htmlFor='nombre'>Nombre: </label>
                </div>
                <Field type='text' name='nombre' />
                <ErrorMessage name='nombre' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='apellido'>Apellido: </label>
                </div>
                <Field type='text' name='apellido' />
                <ErrorMessage name='apellido' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='genero'>Sexo: </label>
                </div>
                <Field name='genero' as='select'>
                  <option value='0' defaultValue>
                    Prefiero no decirlo
                  </option>
                  <option value='1'>Hombre</option>
                  <option value='2'>Mujer</option>
                </Field>
                <ErrorMessage name='genero' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='pais'>Pais: </label>
                </div>
                <Field type='text' name='pais' />
                <ErrorMessage name='pais' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='ciudad'>Ciudad: </label>
                </div>
                <Field type='text' name='ciudad' />
                <ErrorMessage name='ciudad' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='fechaNacimiento'>Fecha de Nacimiento: </label>
                </div>
                <Field type='date' name='fechaNacimiento' />
                <ErrorMessage name='fechaNacimiento' component='span' />
              </li>
            </ul>
            <button type='submit' disabled={isSubmitting}>
              actualizar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PanelEditarPerfil;
