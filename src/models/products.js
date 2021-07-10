const querySQL = require('../helpers/querySql');

module.exports = {
  getAllProducts: () => {
    return querySQL(`SELECT * FROM products`);
  },
  getItemProduct: (id) => {
    return querySQL('SELECT * FROM products WHERE id = ?', id);
  },
  createNewProduct: (data) => {
    return querySQL(`INSERT INTO products SET ?`, data);
  },
  updateProduct: (id, data) => {
    return querySQL(`UPDATE products SET ? WHERE id = ?`, [data, id]);
  },
  deleteProduct: (id) => {
    return querySQL(`DELETE FROM products WHERE id = ?`, id);
  },
  searchProducts: async(value, limit, table, field, sortBy, offset) => {
    // console.log(value, limit, table, field, sortBy);
    // check result count searching

    // IN NATURAL LANGUAGE MODE
    // WITH QUERY EXPANSION

    // `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST(${value} WITH QUERY EXPANSION)`

    const getCountRows = await querySQL(
      `SELECT COUNT(*) FROM ${table} WHERE nameProduct LIKE '%${value}%' OR description LIKE '%${value}%'`
    );
    const dataCountRows = getCountRows[0];
    let numDataCountRows = Object.values(dataCountRows)[0];
    let limitResult;
    // console.log(numDataCountRows);
    if (numDataCountRows <= 8) {
      limitResult = await querySQL(
        `SELECT * FROM ${table} WHERE nameProduct LIKE '%${value}%' OR description LIKE '%${value}%'`
      );
    } else {
      limitResult = await querySQL(
        `SELECT * FROM ${table}  WHERE nameProduct LIKE '%${value}%' OR description LIKE '%${value}%' LIMIT ${limit} OFFSET ${offset}`
      );
    }

    // totalPage
    const totalPageBefore = numDataCountRows / limit; // 2.374
    const convertMin = totalPageBefore.toFixed(0); // 2
    const convertMax = totalPageBefore.toFixed(1); // 2.3
    let totalPageAfter;

    if (convertMin < convertMax) {
      totalPageAfter = parseInt(convertMin) + 1;
    } else {
      totalPageAfter = parseInt(convertMin);
    }

    // console.log(1, totalPageBefore);
    // console.log(2, convertMin);
    // console.log(3, convertMax);
    // console.log(4, totalPageAfter);
    const dataResponse = {
      countResult: numDataCountRows,
      limit,
      totalPage: totalPageAfter,
      data: limitResult,
    };
    return dataResponse;
  },
};