const salesModel = require('../models/salesModel');
const ErrorProvider = require('../error');
const { checkProductId, checkSaleId } = require('./validations');

const addSaleProduct = async (saleId, saleList) => { 
  await Promise.all(saleList.map(async (sale) => {
    await salesModel.addSaleProduct(saleId, sale.productId, sale.quantity);
  }));
};

const addSale = async (saleList) => {
  await checkProductId(saleList);
  
  const { insertId } = await salesModel.addSale(saleList);
  await addSaleProduct(insertId, saleList);
  return insertId;
};

const getAll = async () => { 
  const data = await salesModel.getAll();
  return data;
};

const getById = async (saleId) => { 
  const data = await salesModel.getById(saleId);
  if (!data.length) throw new ErrorProvider(404, 'Sale not found');
  return data;
};

const updateSale = async (saleId, saleList) => {
  await checkProductId(saleList);
  await checkSaleId([{ saleId }]);
  
  await Promise.all(saleList.map(async (sale) => {
      await salesModel.updateSale(sale.productId, sale.quantity, saleId);
  }));
};

const deleteSale = async (saleId) => { 
  await checkSaleId([{ saleId }]);

  await salesModel.deleteSale(saleId);
};

module.exports = { addSale, getAll, getById, deleteSale, updateSale };