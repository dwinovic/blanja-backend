const express = require('express');
const router = express.Router();
const { uploadMultiple } = require('../middleware/multer');
const {
  getAllProducts,
  getItemProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

router
  .get('/', getAllProducts)
  .post('/', uploadMultiple, createNewProducts)
  .get('/:id', getItemProduct)
  .post('/:id', updateProduct)
  .delete('/:id', deleteProduct);

module.exports = router;