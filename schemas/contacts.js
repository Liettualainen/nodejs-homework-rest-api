const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().required(),
})

const nameAddSchema = Joi.object({
  name: Joi.string().required(),
})


module.exports = {
  addSchema,
    nameAddSchema,
}