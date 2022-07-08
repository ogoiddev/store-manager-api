const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const ErrorProvider = require('../error');

const checkProductId = async (Ids) => {  
  const [check] = await Promise.all(Ids.map(async (sale) => {
    const id = await productsModel.getById(sale.productId);
    return id;
  }));

  check.forEach((each) => {
    if (each.length === 0) throw new ErrorProvider(404, 'Product not found');
  });
};

const checkSaleId = async (Ids) => {  
  const check = await Promise.all(Ids.map(async (sale) => {
    const id = await salesModel.getById(sale.saleId);
    return id;
  }));

  check.forEach((each) => {
    if (each.length === 0) throw new ErrorProvider(404, 'Sale not found');
  });
};

module.exports = { checkProductId, checkSaleId };