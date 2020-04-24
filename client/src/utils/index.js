import React from 'react';

export const cargarDatosPerfil = perfil => {
  //fecha de cumpleaños
  const dia = new Date(perfil.fecha_nacimiento).getDate();
  let mes = new Date(perfil.fecha_nacimiento).toLocaleString('default', {
    month: 'long',
  });
  mes = mes[0].toUpperCase() + mes.slice(1, mes.length);

  const datos = {};
  datos.cumple = ['Cumpleaños:', dia + ' de ' + mes];
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
