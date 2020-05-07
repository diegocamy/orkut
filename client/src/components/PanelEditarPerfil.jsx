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
    bio: yup.string(),
    relacion: yup.number().min(0).max(5),
    fuma: yup.number().min(0).max(3),
    bebe: yup.number().min(0).max(3),
    ocupacion: yup
      .string()
      .max(255, 'Ocupacion no puede superar 255 caracteres'),
    orientacion: yup.number().min(0).max(3),
    hijos: yup.number().min(0).max(3),
    mascotas: yup.number().min(0).max(4),
    viviendo: yup.number().min(0).max(4),
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
          bio: perfil.bio || '',
          relacion: perfil.relacion || 0,
          fuma: perfil.fuma || 0,
          bebe: perfil.bebe || 0,
          ocupacion: perfil.ocupacion || '',
          orientacion: perfil.orientacion || 0,
          hijos: perfil.hijos || 0,
          mascotas: perfil.mascotas || 0,
          viviendo: perfil.viviendo || 0,
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
              <li>
                <div>
                  <label htmlFor='bio'>Acerca de mi: </label>
                </div>
                <Field component='textarea' name='bio' />
              </li>
              <li>
                <div>
                  <label htmlFor='relacion'>Relacion: </label>
                </div>
                <Field name='relacion' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>soltero/a</option>
                  <option value='2'>casado/a</option>
                  <option value='3'>comprometido/a</option>
                  <option value='4'>matrimonio abierto</option>
                  <option value='5'>realación abierta</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='fuma'>Fumo: </label>
                </div>
                <Field name='fuma' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>si</option>
                  <option value='2'>socialmente</option>
                  <option value='3'>no</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='bebe'>Bebo: </label>
                </div>
                <Field name='bebe' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>si</option>
                  <option value='2'>socialmente</option>
                  <option value='3'>no</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='ocupacion'>Ocupacion: </label>
                </div>
                <Field type='text' name='ocupacion' />
                <ErrorMessage name='ocupacion' component='span' />
              </li>
              <li>
                <div>
                  <label htmlFor='orientacion'>Orientacion sexual: </label>
                </div>
                <Field name='orientacion' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>heterosexual</option>
                  <option value='2'>homosexual</option>
                  <option value='3'>otro</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='hijos'>Hijos: </label>
                </div>
                <Field name='hijos' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>si</option>
                  <option value='2'>en un futuro</option>
                  <option value='3'>no</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='mascotas'>Mascotas: </label>
                </div>
                <Field name='mascotas' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>si</option>
                  <option value='2'>las prefiero en el zoologico</option>
                  <option value='3'>en un futuro</option>
                  <option value='4'>no me gustan las mascotas</option>
                </Field>
              </li>
              <li>
                <div>
                  <label htmlFor='viviendo'>Viviendo: </label>
                </div>
                <Field name='viviendo' as='select'>
                  <option value='0' defaultValue>
                    prefiero no decirlo
                  </option>
                  <option value='1'>solo</option>
                  <option value='2'>con mis padres</option>
                  <option value='3'>con amigos</option>
                  <option value='4'>en pareja</option>
                </Field>
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
