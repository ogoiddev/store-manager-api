const ErrorProvider = require('../error');
const { schemaName } = require('../helpers/joiSchema');

const validateName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) throw new ErrorProvider(400, '"name" is required');
  
  const { error } = schemaName.validate(name);
  if (!error) return next();
  
  throw new ErrorProvider(422, error.message);
};

module.exports = { validateName };