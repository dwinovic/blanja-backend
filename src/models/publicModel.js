const querySQL = require('../helpers/querySql');
// const { querySQL } = require('../helpers');

module.exports = {
  paginationModel: (table, field, sortBy, limit, offset) => {
    return querySQL(
      `SELECT * FROM ${table} ORDER BY ${table}.${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}`
    );
  },
  countAllRowsData: (table) => {
    return querySQL(`SELECT COUNT(*) FROM ${table}`);
  },
  searchFeature: async(value, limit, table, field, sortBy) => {
    // check result count searching

    // IN NATURAL LANGUAGE MODE
    // WITH QUERY EXPANSION

    const getCountRows = await querySQL(
      `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST('${value}' IN NATURAL LANGUAGE MODE)`
    );
    const dataCountRows = getCountRows[0];
    const numDataCountRows = Object.values(dataCountRows)[0];
    // console.log(numDataCountRows);

    if (numDataCountRows <= 8) {
      return querySQL(
        `SELECT * from ${table} WHERE MATCH(nameProduct, description) AGAINST('${value}' IN NATURAL LANGUAGE MODE) ORDER BY ${table}.${field} ${sortBy}`
      );
    }
    const limitResult = await querySQL(
      `SELECT * from ${table}  WHERE MATCH(nameProduct, description) AGAINST('${value}' IN NATURAL LANGUAGE MODE) ORDER BY ${table}.${field} ${sortBy} LIMIT ${limit}`
    );

    const dataResponse = {
      countResult: numDataCountRows,
      limit,
      data: limitResult,
    };
    return dataResponse;
  },
};