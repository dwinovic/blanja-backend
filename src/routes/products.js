const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

const {
  getAllProducts,
  getItemProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = productController;

router
  .get('/', getAllProducts)
  .post('/add', createNewProducts)
  .get('/:id', getItemProduct)
  .post('/:id', updateProduct)
  .delete('/:id', deleteProduct);

module.exports = router;