const { response } = require('../helpers');
const { findProduct } = require('../models/products');
const ProductsModel = require('../models/products');

const {
  getAllProducts,
  getItemProduct,
  updateProduct,
  createNewProduct,
  deleteProduct,
} = ProductsModel;

module.exports = {
  findProduct: (req, res) => {
    // console.log(req.query);
    const searching = req.query.src;
    const sort = req.query.sort;

    // pagination default
    if (!searching || !sort) {
      const data = res.pagination;
      if (data.statusCode === 500) {
        response(res, 500, {}, data.error, data.status);
      }
      response(res, 200, data);
    }
  },
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
    const {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct,
    } = req.body;
    const dataProducts = {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // console.log(dataProducts);
    createNewProduct(dataProducts)
      .then((result) => {
        // console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct,
    } = req.body;
    const dataProduct = {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct,
      updatedAt: new Date(),
    };
    // console.log(dataProduct);

    updateProduct(id, dataProduct)
      .then((result) => {
        // console.log(result);
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
        // console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};