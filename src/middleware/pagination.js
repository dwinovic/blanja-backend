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
    const dataResponse = {
      status: 'Success',
      statusCode: 200,
      pagination: {
        totalPage: null,
        currentPage: null,
        limit: null,
      },
      data: null,
    };

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
          console.log(data);

          dataResponse.pagination.currentPage = page;
          dataResponse.pagination.limit = limit;
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

          dataResponse.pagination.currentPage = page;
          dataResponse.pagination.limit = limit;
          dataResponse.data = data;
        })
        .catch(next);
    }

    // all page
    await countAllRowsData(queryTables).then((result) => {
      const data = Object.values(result[0])[0];
      let allPage = data / dataResponse.pagination.limit; // 10.33333
      let fixed = allPage.toFixed(0); // 10
      let fixed2 = allPage.toFixed(1); // 10.3
      // console.log(allPage);
      // console.log('fixed: ', fixed);
      // console.log('fixed2: ', fixed2);
      if (parseInt(fixed) < parseInt(fixed2)) {
        console.log(parseInt(fixed) + 1);
        allPage = parseInt(fixed) + 1;
        dataResponse.pagination.totalPage = allPage;
      } else {
        // console.log('else', fixed);
        allPage = parseInt(fixed);
        dataResponse.pagination.totalPage = allPage;
      }
    });

    // response
    dataResponse.pagination.sortBy = `${queryField} ${querySort}`;

    if (!req.query.src) {
      res.status(200).json(dataResponse);
    }

    next();
  };
};