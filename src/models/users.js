const { querySQL } = require('../helpers');
module.exports = {
  getAllUsers: () => {
    return querySQL('SELECT * FROM users');
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