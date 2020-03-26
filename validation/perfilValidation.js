const Joi = require('@hapi/joi');

const schema = Joi.object({
  nombre: Joi.string()
    .required()
    .messages({
      'any.required': 'Debe ingresar un nombre',
      'string.base': 'Debe ingresar un nombre'
    }),
  apellido: Joi.string()
    .required()
    .messages({
      'any.required': 'Debe ingresar un apellido',
      'string.base': 'Debe ingresar un apellido'
    }),
  ciudad: Joi.string()
    .required()
    .messages({
      'any.required': 'Debe ingresar un ciudad',
      'string.base': 'Debe ingresar un ciudad'
    }),
  pais: Joi.string()
    .required()
    .messages({
      'any.required': 'Debe ingresar un pais',
      'string.base': 'Debe ingresar un pais'
    }),
  genero: Joi.number()
    .min(0)
    .max(2)
    .messages({
      'number.base': 'Seleccione un genero'
    }),
  fechaNacimiento: Joi.date()
    .required()
    .messages({
      'any.required': 'Debe ingresar una fecha de nacimiento',
      'date.base': 'Debe ingresar una fecha de nacimiento'
    }),
  foto: Joi.string().allow('')
});

module.exports = schema;
