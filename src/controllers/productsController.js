const { response, srcResponse, srcFeature, pagination } = require('../helpers');
const {
  searchProductsModel,
  getAllProductsModel,
  deleteProduct,
  getItemProductModel,
  createNewProductModel,
  updateProductModel,
} = require('../models/products');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      // PAGINATION
      if (!req.query.src && !req.query.category) {
        const result = await pagination(req, res, next, getAllProductsModel);
        // console.log(Object.keys(result));
        const {
          totalPage,
          currentPage,
          limit,
          totalData,
          data,
          error,
          sortBy,
        } = result;

        // console.log(1, totalPage);

        const meta = {
          currentPage,
          totalData,
          limit,
          totalPage,
          sortBy,
        };
        // console.log(2, data.length);
        // return;
        if (data.length === 0) {
          // console.log(error);
          srcResponse(res, 404, meta, {}, error, error);
        } else {
          srcResponse(res, 200, meta, data);
        }
      }
      // SEARCHING
      if (req.query.src || req.query.category) {
        srcFeature(req, res, next, searchProductsModel).then(() => {
          // console.log(Object.keys(res.result));
          const { data, meta, error } = res.result;
          if (error.statusCode && error.message) {
            srcResponse(
              res,
              error.statusCode,
              meta,
              {},
              error.message,
              error.message
            );
          } else {
            srcResponse(res, 200, meta, data, {});
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getItemProduct: (req, res) => {
    const id = req.params.id;
    getItemProductModel(id)
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
    createNewProductModel(dataProducts)
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

    updateProductModel(id, dataProduct)
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
