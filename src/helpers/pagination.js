const { getAllProducts } = require('../models/products');
const { paginationModel, countAllRowsData } = require('../models/publicModel');

const connection = require('../config/db_connection');

module.exports = pagination = async(req, res, next, model) => {
  // RESPONSE
  let data = {};

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
  // limiation logic
  let startIndex = 0;
  // Count rows in tables column
  let countRows;

  // default query params
  if (isQueryParams.length === 0) {
    limit;
    startIndex = 0;
    await model(queryField, querySort, limit, startIndex)
      .then((result) => {
        // console.log(result.countRows);
        // console.log(Object.keys(result));
        const { countRows: rows, result: dataResult } = result;
        countRows = rows;

        data.currentPage = page;
        data.limit = limit > countRows ? rows : limit;
        data.totalData = rows;
        data.data = dataResult;
        data.totalPage = rows > limit ? rows / limit : 1;
      })
      .catch(next);
  } else {
    page = queryPage || page;
    limit = queryLimit || limit;
    startIndex = (page - 1) * limit;
    await model(queryField, querySort, limit, startIndex)
      .then((result) => {
        const { countRows: rows, result: dataResult } = result;
        countRows = rows;

        data.currentPage = page;
        data.limit = limit > countRows ? rows : limit;
        data.totalData = rows;
        data.data = dataResult;
        data.totalPage = rows > limit ? rows / limit : 1;
      })
      .catch(next);
    // console.log(data);
    if (queryPage > data.totalPage) {
      data.error = 'Page not found';
    }
    // limit validate
    if (queryLimit > countRows) {
      data.limit = countRows;
      data.totalPage = 1;
    }
  }

  // CONDITION PAGE EXAMPLE 3.875
  if (data.totalPage !== parseInt(data.totalPage.toFixed(0))) {
    const fixed1 = parseInt(data.totalPage.toFixed(1));
    data.totalPage = fixed1 + 1;
  }

  // RESPONSE TO CONTROLLER
  data.sortBy = `${queryField} ${querySort}`;
  return data;
};