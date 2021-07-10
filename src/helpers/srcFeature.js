const srcResponse = require('./srcResponse');
const { searchFeature } = require('../models/publicModel');

module.exports = srcFeature = async(req, res, next) => {
  const querySrc = req.query.src;
  const queryLimit = parseInt(req.query.limit);
  const queryTables = req.baseUrl.substring(1);
  const querySort = req.query.sort || 'DESC';
  const queryField = req.query.field || 'updatedAt';
  const limit = queryLimit || 8;

  // response data
  let dataResponse = {
    meta: {},
    data: {},
  };

  await searchFeature(querySrc, limit, queryTables, queryField, querySort)
    .then((result) => {
      console.log(result);
      const { countResult, limit, data } = result;

      dataResponse.meta = {
        keyword: querySrc,
        countResult: countResult,
        limit,
        sortBy: `${queryField} ${querySort}`,
      };

      dataResponse.data = data;

      // res.status(500).json(dataResponse);

      srcResponse(res, 200, dataResponse.meta, dataResponse.data, {});
    })
    .catch(next);
  next();
};