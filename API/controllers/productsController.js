const productsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const data = await productsService.getAll();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const data = await productsService.getById(id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const getByName = async (req, res, next) => { 
  const { q } = req.query;
  
    try {
    const data = await productsService.getByName(q);
    return res.status(200).json([...data]);
  } catch (error) {
    return next(error);
  }
};

const addProduct = async (req, res, next) => {
  const { name } = req.body;

  try {
    const data = await productsService.addProduct(name);
    return res.status(201).json({ id: data.insertId, name });
  } catch (error) {
    return next(error);
  }
};

const updateProductName = async (req, res, next) => { 
  const { id } = req.params;
  const { name } = req.body;

  try {
    await productsService.updateProductName(id, name);
    return res.status(200).json({ id, name });
  } catch (error) { 
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => { 
  const { id } = req.params;

  try {
    await productsService.deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
  addProduct,
  updateProductName,
  deleteProduct,
};