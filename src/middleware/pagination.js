const productsController = require('../controllers/productsController');
const { response } = require('../helpers');

const pagination = (model) => {
  return async(req, res, next) => {
    console.log(req.query);

    // return;
    const isQueryParams = Object.keys(req.query);
    let queryPage = parseInt(req.query.page);
    let queryLimit = parseInt(req.query.limit);
    let querySort = req.query.sort;
    let queryField = req.query.field;

    let page;
    // default limit
    let limit = 8;
    let queryGetAll;
    const limitResult = {};
    let startIndex;
    let endIndex;
    let errorHandling;

    if (isQueryParams.length === 0) {
      page = 1;
      limit;
      console.log(limit);

      await model
        .getAllProductBySort(queryGetAll)
        .then((result) => {
          const data = result;
          startIndex = (page - 1) * limit;
          endIndex = page * limit;

          const limitData = data.slice(startIndex, endIndex);

          limitResult.page = page;
          limitResult.limit = limit;
          limitResult.result = limitData;
        })
        .catch((err) => {
          console.log('error', err);
          errorHandling = err;
        });
    } else {
      page = queryPage;
      limit = queryLimit || limit;

      queryGetAll = `SELECT * FROM products ORDER BY products.updatedAt ${
        !querySort ? 'DESC' : querySort
      }`;

      await model
        .getAllProductBySort(queryGetAll)
        .then((result) => {
          const data = result;
          startIndex = (page - 1) * limit;
          endIndex = page * limit;
          const limitData = data.slice(startIndex, endIndex);

          limitResult.page = page;
          limitResult.limit = limit;
          limitResult.result = limitData;
        })
        .catch((err) => {
          console.log('error', err);
          errorHandling = err;
        });
    }

    if (Object.keys(limitResult).length === 0) {
      limitResult.status = 'error';
      limitResult.statusCode = 500;
      limitResult.error = errorHandling;
      console.log('limitResult', limitResult);
      res.pagination = limitResult;
    } else {
      res.pagination = limitResult;
    }

    next();
  };
};

module.exports = pagination;