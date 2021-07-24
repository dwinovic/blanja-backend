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
const { verifyAccess, superAccess } = require('../middleware/auth');
const {
  hitCacheProductId,
  hitCacheAllProducts,
} = require('../middleware/redis');

router
  .get('/', hitCacheAllProducts, getAllProducts)
  .post(
    '/',
    verifyAccess,
    superAccess,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    createNewProducts
  )
  .get('/:id', verifyAccess, hitCacheProductId, getItemProduct)
  .post(
    '/:id',
    verifyAccess,
    superAccess,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    updateProduct
  )
  .delete('/:id', verifyAccess, superAccess, deleteProduct);

module.exports = router;