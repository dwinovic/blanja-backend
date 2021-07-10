const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getItemProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');
const { pagination } = require('../middleware');

router
  .get('/', pagination(), getAllProducts)
  .post('/add', createNewProducts)
  .get('/:id', getItemProduct)
  .post('/:id', updateProduct)
  .delete('/:id', deleteProduct);

module.exports = router;