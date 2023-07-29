const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().required(),
})

const favoriteAddSchema = Joi.object({
  favorite: Joi.boolean().required(),
})


module.exports = {
  addSchema,
    favoriteAddSchema,
}