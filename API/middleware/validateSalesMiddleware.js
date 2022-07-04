const ErrorProvider = require('../error');
const { schemaQuantity } = require('../helpers/joiSchema');

const validateSaleList = (req, _res, next) => {
  const saleList = req.body;

  saleList.forEach((sale) => {
    if (sale.productId === undefined) throw new ErrorProvider(400, '"productId" is required');
    if (sale.quantity === undefined) throw new ErrorProvider(400, '"quantity" is required');
    const { error } = schemaQuantity.validate(sale.quantity);
    if (error) throw new ErrorProvider(422, error.message);
  });

  next();
};

module.exports = { validateSaleList };