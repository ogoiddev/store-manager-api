const Joi = require('joi');

const schemaName = Joi.string()
  .min(5)
  .messages({
    'string.min': '"name" length must be at least 5 characters long',
  });

const schemaQuantity = Joi.number()
  .min(1)
  .messages({
    'number.min': '"quantity" must be greater than or equal to 1',
  });

module.exports = { schemaName, schemaQuantity };
