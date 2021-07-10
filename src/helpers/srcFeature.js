const { searchProducts } = require('../models/products');
const convertionAllPage = require('./convertionAllPage');
const srcResponse = require('./srcResponse');

module.exports = srcFeature = async(req, res, next) => {
  const querySrc = req.query.src;
  const queryLimit = parseInt(req.query.limit);
  const queryTables = req.baseUrl.substring(1);
  const querySort = req.query.sort || 'DESC';
  const queryPage = req.query.page;
  const queryField = req.query.field || 'updatedAt';
  const limit = queryLimit || 8;

  // response data
  let dataResponse = {};

  let startIndex = queryPage || 1;

  // searching product
  if (queryTables === 'products') {
    await searchProducts(
        querySrc,
        limit,
        queryTables,
        queryField,
        querySort,
        startIndex
      )
      .then((result) => {
        // console.log(result);
        // res.status(200).json(result);

        const { countResult, limit, data, totalPage } = result;
        // totalPage

        dataResponse.meta = {
          keyword: querySrc,
          countResult: countResult,
          totalPage,
          limit,
          sortBy: `${queryField} ${querySort}`,
        };

        dataResponse.data = data;
        // console.log(dataResponse);
        res.result = dataResponse;
      })
      .catch(next);
    next();
  } else if (queryTables === 'users') {
    console.log('Searching Users in development');
  }
};