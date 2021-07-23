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
const verifyAccess = require('../middleware/auth');

router
  .get('/', getAllProducts)
  .post(
    '/',
    verifyAccess,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    createNewProducts
  )
  .get('/:id', verifyAccess, getItemProduct)
  .post(
    '/:id',
    verifyAccess,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    updateProduct
  )
  .delete('/:id', verifyAccess, deleteProduct);

module.exports = router;