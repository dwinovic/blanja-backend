const express = require('express');
const router = express.Router();
const { uploadFile } = require('../middleware/multer');
const {
  getAllProducts,
  getItemProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

router
  .get('/', getAllProducts)
  .post(
    '/',
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    createNewProducts
  )
  .get('/:id', getItemProduct)
  .post(
    '/:id',
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    updateProduct
  )
  .delete('/:id', deleteProduct);

module.exports = router;