const { getAllProducts } = require('../models/products');
const { paginationModel, countAllRowsData } = require('../models/publicModel');

module.exports = pagination = (model) => {
  return async(req, res, next) => {
    // default route, don't have a quey param, pure url
    const isQueryParams = Object.keys(req.query);

    // query pagination
    let queryPage = parseInt(req.query.page);
    let queryLimit = parseInt(req.query.limit);
    let queryTables = req.baseUrl.substring(1);

    // query sort and filter
    let querySort = req.query.sort || 'DESC';
    let queryField = req.query.field || 'updatedAt';

    let page = 1;
    // default limit is 8
    let limit = queryLimit || 8;
    // data object to send response foward
    const dataResponse = {};

    // limiation logic
    let startIndex;

    // Count rows in tables column
    let countRows;
    await countAllRowsData(queryTables).then((result) => {
      countRows = Object.values(result[0])[0];
      let allPage = countRows / limit; // 10.33333
      let fixed = allPage.toFixed(0); // 10
      let fixed2 = allPage.toFixed(1); // 10.3
      // console.log(allPage);
      // console.log('fixed: ', fixed);
      // console.log('fixed2: ', fixed2);
      if (parseInt(fixed) < parseInt(fixed2)) {
        // console.log(parseInt(fixed) + 1);
        allPage = parseInt(fixed) + 1;
        dataResponse.totalPage = allPage;
      } else {
        // console.log('else', fixed);
        allPage = parseInt(fixed);
        dataResponse.totalPage = allPage;
      }
    });

    // default query params
    if (isQueryParams.length === 0) {
      page = 1;
      limit;
      startIndex = 0;

      await model()
        .then((result) => {
          const data = result;
          // console.log(data);

          dataResponse.currentPage = page;
          dataResponse.limit = limit > countRows ? countRows : limit;
          dataResponse.totalData = countRows;
          dataResponse.data = data;
        })
        .catch(next);
    } else {
      page = queryPage || page;
      limit = queryLimit || limit;
      startIndex = (page - 1) * limit;

      await model()
        .then((result) => {
          const data = result;

          dataResponse.currentPage = page;
          dataResponse.limit = limit > countRows ? countRows : limit;
          dataResponse.totalData = countRows;
          dataResponse.data = data;
        })
        .catch(next);
    }

    if (queryPage > dataResponse.totalPage) {
      dataResponse.error = 'Page not found';
    }

    // limit validate
    if (queryLimit > countRows) {
      dataResponse.limit = countRows;
      dataResponse.totalPage = 1;
    }

    // response
    dataResponse.sortBy = `${queryField} ${querySort}`;

    if (!req.query.src) {
      res.pagination = dataResponse;
    }

    next();
  };
};