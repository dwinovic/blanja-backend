const { paginationModel, countAllRowsData } = require('../models/publicModel');

module.exports = pagination = () => {
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
    let limit = 8;
    // data object to send response foward
    const dataResponse = {};

    // limiation logic
    let startIndex;

    // error handler

    if (isQueryParams.length === 0) {
      page = 1;
      limit;
      startIndex = 0;

      await paginationModel(
          queryTables,
          queryField,
          querySort,
          limit,
          startIndex
        )
        .then((result) => {
          const data = result;
          // console.log(data);

          dataResponse.currentPage = page;
          dataResponse.limit = limit;
          dataResponse.data = data;
        })
        .catch(next);
    } else {
      page = queryPage || page;
      limit = queryLimit || limit;
      startIndex = (page - 1) * limit;

      await paginationModel(
          queryTables,
          queryField,
          querySort,
          limit,
          startIndex
        )
        .then((result) => {
          const data = result;

          dataResponse.currentPage = page;
          dataResponse.limit = limit;
          dataResponse.data = data;
        })
        .catch(next);
    }

    // all page
    await countAllRowsData(queryTables).then((result) => {
      const data = Object.values(result[0])[0];
      let allPage = data / dataResponse.limit; // 10.33333
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

    // response
    dataResponse.sortBy = `${queryField} ${querySort}`;

    if (!req.query.src) {
      res.pagination = dataResponse;
    }

    next();
  };
};