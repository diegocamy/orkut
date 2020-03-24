const Joi = require('@hapi/joi');

const schema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      'string.base':
        'Debe escribir una dirección de correo electrónico valida!',
      'string.email':
        'Debe escribir una dirección de correo electrónico valida!',
      'any.required':
        'Debe escribir una dirección de correo electrónico valida!'
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'any.required': 'Debe escribir una contraseña'
    })
});

module.exports = schema;
