require('dotenv').config();
const express = require('express');
const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/products');
const categoryRouter = require('./src/routes/category');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});