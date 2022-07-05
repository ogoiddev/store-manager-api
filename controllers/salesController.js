const salesService = require('../services/salesService');

const addSale = async (req, res, next) => { 
  const saleList = req.body;
  try {
    const saleId = await salesService.addSale(saleList);
    return res.status(201).json({ id: saleId, itemsSold: req.body });
  } catch (error) { 
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const data = await salesService.getAll();
    return res.status(200).json(data);
  } catch (error) { 
    return next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await salesService.getById(id);
    return res.status(200).json(data);
  } catch (error) { 
    return next(error);
  }
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  const saleList = req.body;

  try {
    await salesService.updateSale(id, saleList);
    return res.status(200).json({ saleId: id, itemsUpdated: req.body });
  } catch (error) {
    return next(error);
  }
};

const deleteSale = async (req, res, next) => { 
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = { addSale, getAll, getById, deleteSale, updateSale };