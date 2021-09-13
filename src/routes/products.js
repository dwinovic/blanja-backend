const express = require('express');
const router = express.Router();
const { uploadFile } = require('../middleware/multer');
const {
  getAllProducts,
  getItemProduct,
  getSellerProduct,
  createNewProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');
const { verifyAccess, sellerAccess } = require('../middleware/auth');
const {
  hitCacheProductId,
  // hitCacheAllProducts,
  clearRedisProduct,
  clearRedisProductById,
} = require('../middleware/redis');

router
  .get('/', getAllProducts)
  .post(
    '/',
    verifyAccess,
    sellerAccess,
    clearRedisProduct,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    createNewProducts
  )
  .get('/seller/:id', verifyAccess, getSellerProduct)
  .get('/:id', verifyAccess, hitCacheProductId, getItemProduct)
  .post(
    '/:id',
    verifyAccess,
    sellerAccess,
    clearRedisProductById,
    (req, res, next) => uploadFile(req, res, next, 'image', 8),
    updateProduct
  )
  .delete(
    '/:id',
    verifyAccess,
    sellerAccess,
    clearRedisProductById,
    deleteProduct
  );

module.exports = router;
