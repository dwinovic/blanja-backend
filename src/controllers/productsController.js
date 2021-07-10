const { response, srcResponse, srcFeature } = require('../helpers');
const {
  searchProduct,
  getAllProducts,
  getItemProduct,
  updateProduct,
  createNewProduct,
  deleteProduct,
} = require('../models/products');

module.exports = {
  getAllProducts: (req, res, next) => {
    if (req.query.src) {
      srcFeature(req, res, next)
        .then((result) => {
          console.log(result);
          const meta = result.meta;
          const data = result.data;
          // srcResponse(res, 200, meta, data, {});
        })
        .catch(next);
    }
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