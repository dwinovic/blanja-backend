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
    // pagination
    // if (!req.query.src) {
    //   getAllProducts().then((result) => {
    //     res.status(200).json(result);
    //   });
    // }
    if (!req.query.src) {
      const { currentPage, limit, data, totalPage, sortBy, error, totalData } =
      res.pagination;

      // console.log(Object.keys(res.pagination));
      // return;
      const meta = {
        currentPage,
        totalData,
        limit,
        totalPage,
        sortBy,
      };
      // console.log(data);
      if (data.length === 0) {
        // console.log(error);
        srcResponse(res, 404, meta, {}, error, error);
      } else {
        srcResponse(res, 200, meta, data);
      }
    }
    // searching
    if (req.query.src) {
      srcFeature(req, res, next).then(() => {
        const data = res.result.data;
        const meta = res.result.meta;
        const error = res.result.error;
        if (error.statusCode && error.message) {
          srcResponse(
            res,
            error.statusCode,
            meta, {},
            error.message,
            error.message
          );
        } else {
          srcResponse(res, 200, meta, data, {});
        }
      });
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