const express = require('express');
const routes = express();
const userRouter = require('./users');
const productRouter = require('./products');
const categoryRouter = require('./category');
const paymentRouter = require('./payments');
const transactionRouter = require('./transaction');
const addressRouter = require('./address');

routes
  .use('/users', userRouter)
  .use('/products', productRouter)
  .use('/category', categoryRouter)
  .use('/payments', paymentRouter)
  .use('/transactions', transactionRouter)
  .use('/address', addressRouter);

module.exports = routes;
