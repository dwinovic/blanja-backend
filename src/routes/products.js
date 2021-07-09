const express = require('express');
const router = express.Router();
const ProductModel = require('../models/products');
const {
  findProduct,
  getAllProducts,
  getItemProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');
const pagination = require('../middleware/pagination');

router
  .get('/', pagination(ProductModel), findProduct)
  .get('/', getAllProducts)
  .post('/add', createNewProducts)
  .get('/:id', getItemProduct)
  .post('/:id', updateProduct)
  .delete('/:id', deleteProduct);

module.exports = router;