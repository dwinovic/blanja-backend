const { querySQL } = require('../helpers');
module.exports = {
  getAllUsers: async(field, sortBy, limit, offset) => {
    const querySelectAll = 'SELECT * FROM users';

    const countDataInRows = await querySQL(`SELECT COUNT(*) FROM users`);

    let countRows = parseInt(Object.values(countDataInRows[0]));

    const querySortLimitAndMore = `
    ORDER BY users.${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}
    `;

    const queryAll = await querySQL(
      `${querySelectAll} ${querySortLimitAndMore}`
    );

    return { countRows, result: queryAll };
  },
  searchUsers: async(value, limit, table, field, sortBy, offset) => {
    // console.log(value, limit, table, field, sortBy);
    // check result count searching

    // IN NATURAL LANGUAGE MODE
    // WITH QUERY EXPANSION

    // `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST(${value} WITH QUERY EXPANSION)`

    const getCountRows = await querySQL(
      `SELECT COUNT(*) FROM ${table} WHERE name LIKE '%${value}%' OR email LIKE '%${value}%'`
    );
    // console.log(getCountRows);
    const dataCountRows = getCountRows[0];
    let numDataCountRows = Object.values(dataCountRows)[0];
    let limitResult;
    // console.log(numDataCountRows);
    // console.log(typeof offset);

    limitResult = await querySQL(
      `SELECT * FROM ${table} WHERE name LIKE '%${value}%' OR email LIKE '%${value}%' ORDER BY ${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}`
    );

    // totalPage
    const totalPageBefore = numDataCountRows / limit; // 2.374
    const convertMin = parseInt(totalPageBefore.toFixed(0)); // 2
    const convertMax = parseInt(totalPageBefore.toFixed(1)); // 2.3
    let totalPageAfter;

    if (convertMin < convertMax) {
      totalPageAfter = parseInt(convertMin) + 1;
    } else {
      totalPageAfter = parseInt(convertMin);
    }
    // console.log(totalPageAfter);

    // console.log(1, totalPageBefore);
    // console.log(2, convertMin);
    // console.log(3, convertMax);
    // console.log(4, totalPageAfter);

    let dataResponse = {
      totalData: numDataCountRows,
      limit: numDataCountRows > limit ? limit : numDataCountRows,
      totalPage: totalPageAfter,
      data: limitResult,
    };

    // console.log(limitResult.length);
    if (limitResult.length === 0) {
      dataResponse.statusCode = 404;
      dataResponse.errorMessage = 'Page not found';
    }
    return dataResponse;
  },
  getUserId: (id) => {
    return querySQL('SELECT * FROM users WHERE id = ?', id);
  },
  createUser: (data) => {
    return querySQL('INSERT INTO users SET ?', data);
  },
  updateUser: (id, data) => {
    return querySQL('UPDATE users SET ? WHERE id = ?', [data, id]);
  },
  deleteUser: (id) => {
    return querySQL('DELETE FROM users WHERE id = ?', id);
  },
  getUserEmail: (email) => {
    return querySQL(`SELECT * FROM users WHERE email LIKE ?`, email);
  },
};