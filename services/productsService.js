const productsModel = require('../models/productsModel');
const ErrorProvider = require('../error');
const { checkProductId } = require('./validations');

const getAll = async () => {
  const data = productsModel.getAll();
  return data;
};

const getById = async (id) => {
  const data = await productsModel.getById(id);  
  if (!data.length) throw new ErrorProvider(404, 'Product not found');
  return data[0];
};

const getByName = async (name) => { 
  const data = await productsModel.getByName(name);
  return data;
};

const addProduct = async (name) => {
  const data = await productsModel.addProduct(name);
  return data;
};

const updateProductName = async (productId, name) => {
  await checkProductId([{ productId }]);

  await productsModel.updateProductName(productId, name);
};

const deleteProduct = async (productId) => { 
  await checkProductId([{ productId }]);

  await productsModel.deleteProduct(productId);
};

module.exports = {
  getAll,
  getById,
  getByName,
  addProduct,
  updateProductName,
  deleteProduct,
};