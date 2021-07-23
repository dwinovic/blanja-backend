const express = require('express');
const categoryController = require('../controllers/categoryController');
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
    (req, res, next) => uploadFile(req, res, next, 'image'),
    createCategory
  )
  .get('/:id', getItemCategory)
  .post(
    '/:id',
    (req, res, next) => uploadFile(req, res, next, 'image'),
    updateCategory
  )
  .delete('/:id', deleteCategory);

module.exports = router;