const { querySQL } = require('../helpers');

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
  findProduct: (data) => {
    return querySQL(
      'SELECT * FROM products ORDER BY products.price ASC LIMIT 5'
    );
  },
  limitationProduct: (limit) => {
    return querySQL(
      'SELECT * FROM products ORDER BY products.updatedAt DESC LIMIT ?',
      limit
    );
  },
  getAllProductBySort: (field, sortBy, limit) => {
    return querySQL(
      `SELECT * FROM products ORDER BY products.${field} ${sortBy} LIMIT ${limit}`
    );
  },
};