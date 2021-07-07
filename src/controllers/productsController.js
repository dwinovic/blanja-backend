const { response } = require('../helpers');
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
        const products = result;
        // console.log('data products', products);
        response(res, 200, products);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getItemProduct: (req, res) => {
    const id = req.params.id;
    getItemProduct(id)
      .then((result) => {
        const product = result;
        response(res, 200, product);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  createNewProducts: (req, res) => {
    const { nameProduct, description, price, stock, updatedAt } = req.body;
    const dataProducts = {
      nameProduct,
      description,
      price,
      stock,
      updatedAt,
    };
    console.log(dataProducts);
    createNewProduct(dataProducts)
      .then((result) => {
        console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const { nameProduct, description, price, id_category, stock } = req.body;
    const dataProduct = {
      nameProduct,
      description,
      price,
      id_category,
      stock,
      updatedAt: new Date(),
    };
    console.log(dataProduct);

    updateProduct(id, dataProduct)
      .then((result) => {
        response(res, 200, dataProduct);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  deleteProduct: (req, res) => {
    const id = req.params.id;
    deleteProduct(id)
      .then((result) => {
        console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};