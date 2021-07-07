const { productControl } = require('../helpers');
const ProductsModel = require('../models/products');

const {
  getAllProducts,
  getItemProduct,
  updateProduct,
  createNewProduct,
  deleteProduct,
} = ProductsModel;

module.exports = {
  getAllProducts: (req, res) => {
    getAllProducts()
      .then((result) => {
        res.status(200).json({
          message: 'Success get all products',
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Internal server error',
        });
      });
  },
  getItemProduct: (req, res) => {
    const id = req.params.id;
    getItemProduct(id)
      .then((result) => {
        res.status(201).json({
          message: 'Success get item product',
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Internal sever error',
        });
      });
  },
  createNewProducts: (req, res) => {
    const { nameProduct, description, price, stock } = req.body;
    const dataProducts = {
      nameProduct,
      description,
      price,
      stock,
    };
    createNewProduct(dataProducts)
      .then(() => {
        res.status(200).json({
          message: 'Success add product',
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Failed to add product',
        });
      });
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const { nameProduct, description, price, stock } = req.body;
    const dataProduct = {
      nameProduct,
      description,
      price,
      stock,
    };
    updateProduct(id, dataProduct)
      .then((result) => {
        res.status(201).json({
          message: 'Success update product',
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Failed to update product',
        });
      });
  },
  deleteProduct: (req, res) => {
    const id = req.params.id;
    console.log(id);
    deleteProduct(id)
      .then((result) => {
        console.log(result.affectedRows);
        if (result.affectedRows) {
          res.status(200).json({
            message: 'Success deleted produts',
          });
        } else {
          res.status(404).json({
            message: 'Data not found',
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed to deleted product',
        });
      });
  },
};