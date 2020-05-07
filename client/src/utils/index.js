import React from 'react';

const calcularEdad = fechaNacimiento => {
  const diff_ms = Date.now() - new Date(fechaNacimiento).getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export const cargarDatosPerfil = perfil => {
  //fecha de cumpleaños
  const dia = new Date(perfil.fecha_nacimiento).getDate();
  let mes = new Date(perfil.fecha_nacimiento).toLocaleString('default', {
    month: 'long',
  });
  mes = mes[0].toUpperCase() + mes.slice(1, mes.length);

  //estado civil
  const estadoCivil = [
    'soltero(a)',
    'casado(a)',
    'comprometido(a)',
    'matrimonio abierto',
    'relación abierta',
  ];

  //hijos
  const hijos = ['si', 'en un futuro', 'no'];

  //orientacion sexual
  const orientacion = ['heterosexual', 'homosexual', 'otro'];

  //fuma
  const fuma = ['si', 'socialmente', 'no'];

  //bebe
  const bebe = ['si', 'socialmente', 'no'];

  //mascotas
  const mascotas = [
    'si',
    'las prefiero en el zoologico',
    'en un futuro',
    'no me gustan las mascotas',
  ];

  //viviendo
  const viviendo = ['solo', 'con mis padres', 'con amigos', 'en pareja'];

  const datos = {};
  if (perfil.relacion && perfil.relacion > 0) {
    datos.relacion = ['Relacion:', estadoCivil[perfil.relacion - 1]];
  }
  datos.cumple = ['Cumpleaños:', dia + ' de ' + mes];
  datos.edad = ['Edad:', calcularEdad(perfil.fecha_nacimiento)];
  datos.bio = ['Acerca de:', perfil.bio];
  if (perfil.hijos && perfil.hijos > 0) {
    datos.hijos = ['Hijos:', hijos[perfil.hijos - 1]];
  }
  if (perfil.orientacion && perfil.orientacion > 0) {
    datos.orientacion = [
      'Orientacion sexual:',
      orientacion[perfil.orientacion - 1],
    ];
  }
  if (perfil.fuma && perfil.fuma > 0) {
    datos.fuma = ['Fuma:', fuma[perfil.fuma - 1]];
  }
  if (perfil.bebe && perfil.bebe > 0) {
    datos.bebe = ['Bebe:', bebe[perfil.bebe - 1]];
  }
  if (perfil.mascotas && perfil.mascotas > 0) {
    datos.mascotas = ['Mascotas:', mascotas[perfil.mascotas - 1]];
  }
  if (perfil.viviendo && perfil.viviendo > 0) {
    datos.viviendo = ['Viviendo:', viviendo[perfil.viviendo - 1]];
  }
  datos.ocupacion = ['Ocupacion:', perfil.ocupacion];
  datos.ciudad = ['Ciudad:', perfil.ciudad];
  datos.pais = ['Pais:', perfil.pais];

  const datosPerfil = [];
  let i = 0;
  for (const key in datos) {
    if (datos.hasOwnProperty(key)) {
      const element = datos[key];
      const markup = (
        <li key={i}>
          <div>
            <p>{element[0]}</p>
          </div>
          <div>
            <p>{element[1]}</p>
          </div>
        </li>
      );
      datosPerfil.push(markup);
    }
    i++;
  }

  return datosPerfil;
};
