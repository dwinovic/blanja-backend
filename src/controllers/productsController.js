const { response, srcResponse, srcFeature, pagination } = require('../helpers');
const uidshort = require('short-uuid');
// const redis = require('redis');
// const client = redis.createClient();
// const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { configCloudinary } = require('../middleware/cloudinary');
cloudinary.config(configCloudinary);

const {
  searchProductsModel,
  getAllProductsModel,
  deleteProduct,
  getItemProductModel,
  getSellerProductModel,
  createNewProductModel,
  updateProductModel,
} = require('../models/products');

const uid = uidshort();

module.exports = {
  getAllProducts: async (req, res, next) => {
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

        // console.log(result);
        // return;
        // Image Condition - Only return one image
        // const getAllImage = data.imageProduct;
        // delete data.imageProduct;
        // const parseToArray = getAllImage;
        // console.log('parseToArray', data);

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
          // const setCache = { meta, data };
          // console.log(data);
          // client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

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
            // SET CACHE IN REDIS
            // const setCache = { meta, data };
            // client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

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
        const product = result[0];
        const images = product.imageProduct.split(',');
        product.imageProduct = images;

        // console.log(1234, product);
        response(res, 200, product);
        // client.setex(`product/${id}`, 60 * 60, JSON.stringify(product));
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getSellerProduct: (req, res) => {
    const id = req.params.id;
    getSellerProductModel(id)
      .then((result) => {
        const product = result;
        // console.log(product);

        response(res, 200, product);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  createNewProducts: async (req, res) => {
    const {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      owner,
      color,
    } = req.body;
    const fileUpload = req.files;

    // console.log('fileUpload', fileUpload);
    // Handle Image convert Array to String
    // eslint-disable-next-line no-undef
    // const locationImage = `${process.env.HOST_SERVER}/files/`;

    const images = [];

    for (const file of fileUpload) {
      const { path } = file;
      // const newPath = path;
      // console.log('newPath', newPath);
      images.push(path);
    }

    const toStr = await images.toString();
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
      owner,
      color,
      imageProduct: toStr,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('dataProducts:', dataProducts);
    createNewProductModel(dataProducts)
      .then(() => {
        // console.log(result);
        response(res, 200, dataProducts);
      })
      .catch((err) => {
        // try {
        //   fileUpload.forEach(async (item) => {
        //     await fs.unlinkSync(`public/images/${item.filename}`);
        //   });
        //   // console.log(`successfully deleted ${image}`);
        // } catch (error) {
        //   // console.error('there was an error:', error.message);
        // }
        response(res, 500, {}, err);
      });
  },
  updateProduct: async (req, res) => {
    // Request
    const id = req.params.id;
    const {
      nameProduct,
      description,
      id_category,
      price,
      stock,
      image: currentImage,
    } = req.body;
    const fileUpload = req.files;
    // console.log('fileUpload', fileUpload);

    // Handle Image convert Array to String
    // eslint-disable-next-line no-undef
    // const locationImage = `${process.env.HOST_SERVER}/files/`;
    console.log('currentImage', currentImage);
    const images = [];

    if (fileUpload) {
      // fileUpload.forEach((item, index) => {
      //   tmpImage.push(`${process.env.HOST_SERVER}/files/${item.filename}`);
      // });
      for (const file of fileUpload) {
        const { path } = file;
        console.log('path', path);
        images.push(path);
      }
    }

    if (currentImage) {
      images.push(currentImage);
      // for (const image of currentImage) {
      //   console.log('image', image);
      //   images.push(image);
      // }
    }
    const toStr = await images.toString();

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
    console.log('dataProduct', dataProduct);
    // // UID
    // const newUid = uid.generate();
    // if (typeof id !== 'string') {
    //   dataProduct.id = newUid;
    // }

    // GET OLD IMAGE NAME
    // let dataImageOld = await getItemProductModel(id)
    //   .then((result) => {
    //     const imageResponse = result[0].imageProduct;
    //     const imageArray = imageResponse.split(',');
    //     return imageArray;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // UPDATE PRODUCTS
    // console.log('dataImageOld', dataImageOld);
    updateProductModel(id, dataProduct)
      .then(() => {
        // console.log('result success', result);
        // console.log('dataProduct', dataProduct);
        response(res, 200, dataProduct);
      })
      .catch((err) => {
        console.log(err);
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
