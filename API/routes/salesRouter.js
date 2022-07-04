const express = require('express');
const salesController = require('../controllers/salesController');
const { validateSaleList } = require('../middleware/validateSalesMiddleware');

const salesRouter = express.Router();

salesRouter.post('/sales', validateSaleList, salesController.addSale);

salesRouter.get('/sales/:id', salesController.getById);
salesRouter.get('/sales', salesController.getAll);

salesRouter.put('/sales/:id', validateSaleList, salesController.updateSale);

salesRouter.delete('/sales/:id', salesController.deleteSale);

module.exports = salesRouter;