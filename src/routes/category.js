const express = require('express');
const categoryController = require('../controllers/categoryController');
const { verifyAccess } = require('../middleware/auth');
const router = express.Router();
const { uploadFile } = require('../middleware/multer');

const {
  createCategory,
  getAllCategory,
  getItemCategory,
  updateCategory,
  deleteCategory,
} = categoryController;

router
  .get('/', getAllCategory)
  .post(
    '/',
    verifyAccess,
    (req, res, next) => uploadFile(req, res, next, 'image'),
    createCategory
  )
  .get('/:id', verifyAccess, getItemCategory)
  .post(
    '/:id',
    verifyAccess,

    (req, res, next) => uploadFile(req, res, next, 'image'),
    updateCategory
  )
  .delete('/:id', verifyAccess, deleteCategory);

module.exports = router;
