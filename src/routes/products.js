const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router
  .get('/', productController.getAllProducts)
  .post('/add', productController.createNewProducts)
  .get('/:id', productController.getItemProduct)
  .post('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

module.exports = router;