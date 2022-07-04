const express = require('express');
const { validateName } = require('../middleware/validateProductsMiddleware');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/products/search', productsController.getByName);
productsRouter.get('/products/:id', productsController.getById);
productsRouter.get('/products', productsController.getAll);

productsRouter.post('/products', validateName, productsController.addProduct);

productsRouter.put('/products/:id', validateName, productsController.updateProductName);

productsRouter.delete('/products/:id', productsController.deleteProduct);

module.exports = productsRouter;