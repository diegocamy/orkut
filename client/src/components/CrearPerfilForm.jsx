import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { crearPerfil } from '../actions/CrearPerfilAction';

import './CrearPerfilForm.css';
import Spinner from './Spinner';

const CrearPerfilForm = ({ crearPerfil, cargando, history }) => {
  const [foto, setFoto] = useState('');

  useEffect(() => {}, [cargando, history]);

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
    fecha_nacimiento: yup
      .date()
      .required('Debe ingresar una fecha de nacimiento'),
  });

  const handleFile = event => {
    const fotoPerfil = event.target.files[0];
    setFoto(fotoPerfil);
  };

  if (cargando) {
    return (
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <Spinner style={{ margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div className='CrearPerfilForm sombra '>
      <h2>Crear Perfil</h2>
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          genero: 0,
          pais: '',
          ciudad: '',
          fecha_nacimiento: '',
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          values.foto = foto;
          const datos = new FormData();
          datos.append('nombre', values.nombre);
          datos.append('apellido', values.apellido);
          datos.append('genero', values.genero);
          datos.append('pais', values.pais);
          datos.append('ciudad', values.ciudad);
          datos.append('fechaNacimiento', values.fecha_nacimiento);
          datos.append('foto', values.foto || '');

          //enviar datos! TODO
          await crearPerfil(datos, history);
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
                  <label htmlFor='fecha_nacimiento'>
                    Fecha de Nacimiento:{' '}
                  </label>
                </div>
                <Field type='date' name='fecha_nacimiento' />
                <ErrorMessage name='fecha_nacimiento' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='foto'>Foto de perfil: </label>
                </div>
                <input
                  type='file'
                  name='foto'
                  multiple={false}
                  onChange={handleFile}
                />
              </li>
            </ul>
            <button type='submit' disabled={isSubmitting}>
              enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cargando: state.crearPerfil.cargando,
  };
};

export default withRouter(
  connect(mapStateToProps, { crearPerfil })(CrearPerfilForm),
);
