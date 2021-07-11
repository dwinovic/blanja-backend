require('dotenv').config();
const express = require('express');
const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/products');
const categoryRouter = require('./src/routes/category');
const paymentRouter = require('./src/routes/payments');
const transactionRouter = require('./src/routes/transaction');
const cors = require('cors');
const { errorHandling } = require('./src/middleware');

const app = express();
const PORT = process.env.PORT;

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// api routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/payments', paymentRouter);
app.use('/transactions', transactionRouter);

app.use((err, req, res, next) => {
  errorHandling(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});