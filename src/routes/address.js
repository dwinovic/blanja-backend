const express = require('express');
const addressController = require('../controllers/addressController');
const { verifyAccess } = require('../middleware/auth');
const router = express.Router();

const { createAddress, getItemAddress, updateAddress } = addressController;

router
  .post('/', verifyAccess, createAddress)
  .get('/:id', verifyAccess, getItemAddress)
  .post('/:id', verifyAccess, updateAddress);
// .delete('/:id', verifyAccess, deleteCategory);

module.exports = router;
