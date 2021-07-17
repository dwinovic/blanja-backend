const express = require('express')
const {
  createItemTransaction,
  getAllTransaction,
  updateItemTransaction
} = require('../controllers/transactionController')
const router = express.Router()

router
  .get('/', getAllTransaction)
  .post('/', createItemTransaction)
  .get('/:id')
  .post('/:id', updateItemTransaction)
  .delete('/:id')

module.exports = router
