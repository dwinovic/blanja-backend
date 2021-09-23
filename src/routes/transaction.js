const express = require('express');
const {
  createItemTransaction,
  getAllTransaction,
  updateItemTransaction,
  getItemTransaction,
  getHistoryTransaction,
} = require('../controllers/transactionController');
const { verifyAccess, sellerAccess } = require('../middleware/auth');
const router = express.Router();

router
  .get('/', verifyAccess, getAllTransaction)
  .post('/', verifyAccess, createItemTransaction)
  .get('/user/:id', verifyAccess, getHistoryTransaction)
  .get('/:id', verifyAccess, getItemTransaction)
  .post('/:id', updateItemTransaction, verifyAccess, sellerAccess)
  .delete('/:id');

module.exports = router;
