const { querySQL } = require('../helpers');
module.exports = {
  createAddress: (data) => {
    return querySQL('INSERT INTO address SET ?', data);
  },
  // getAllCategory: () => {
  //   return querySQL('SELECT * FROM category');
  // },
  getItemAddress: (id) => {
    return querySQL('SELECT * FROM address WHERE id_address = ?', id);
  },
  updateAddress: (id, data) => {
    return querySQL('UPDATE address SET ? WHERE id_address = ?', [data, id]);
  },
  // deleteCategory: (id) => {
  //   return querySQL('DELETE FROM category WHERE id = ?', id);
  // },
};
