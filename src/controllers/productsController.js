const { response, srcResponse, srcFeature, pagination } = require('../helpers');
const uidshort = require('short-uuid');
const redis = require('redis');
const client = redis.createClient();

const {
  searchProductsModel,
  getAllProductsModel,
  deleteProduct,
  getItemProductModel,
  createNewProductModel,
  updateProductModel,
} = require('../models/products');

const uid = uidshort();

module.exports = {
  getAllProducts: async(req, res, next) => {
    try {
      // PAGINATION
      if (!req.query.src) {
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
          // SET CACHE IN REDIS
          const setCache = { meta, data };
          client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

          srcResponse(res, 200, meta, data);
        }
      }
      // SEARCHING
      if (req.query.src) {
        srcFeature(req, res, next, searchProductsModel).then(() => {
          // console.log(Object.keys(res.result));
          const { data, meta, error } = res.result;
          if (error.statusCode && error.message) {
            srcResponse(
              res,
              error.statusCode,
              meta, {},
              error.message,
              error.message
            );
          } else {
            // SET CACHE IN REDIS
            const setCache = { meta, data };
            client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

            srcResponse(res, 200, meta, data, {});
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getItemProduct: (req, res) => {
    // Request
    const id = req.params.id;
    // console.log(req.user);
    getItemProductModel(id)
      .then((result) => {
        const product = result;
        client.setex(`product/${id}`, 60 * 60, JSON.stringify(product));
        response(res, 200, product);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  createNewProducts: (req, res) => {
    const { nameProduct, description, id_category, price, stock } = req.body;
    const dataFilesRequest = req.files;
    // console.log('dataFilesRequest', dataFilesRequest);
    // Handle Image convert Array to String
    const images = [];
    dataFilesRequest.forEach((item) => {
      images.push(item.filename);
    });
    const toStr = images.toString();
    // UID
    const newUid = uid.generate();
    // Data to insert in DB
    const dataProducts = {
      id: newUid,
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct: toStr,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // console.log(dataProducts);
    createNewProductModel(dataProducts)
      .then(() => {
        // console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateProduct: (req, res) => {
    // Request
    const id = req.params.id;
    const { nameProduct, description, id_category, price, stock } = req.body;
    const dataFilesRequest = req.files;
    // console.log('dataFilesRequest', dataFilesRequest);

    // Handle Image convert Array to String
    const images = [];
    dataFilesRequest.forEach((item) => {
      images.push(item.filename);
    });
    const toStr = images.toString();

    // Data to update in DB
    let dataProduct = {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      imageProduct: toStr,
      updatedAt: new Date(),
    };

    // UID
    const newUid = uid.generate();
    if (typeof id !== 'string') {
      dataProduct.id = newUid;
    }

    updateProductModel(id, dataProduct)
      .then(() => {
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
      .then(() => {
        // console.log(result);
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};