const connection = require('../config/db_connection');

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE id = ?',
        id,
        (error, result) => {
          if (!error) {
            // console.log(22, result);
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  createUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE users SET ? WHERE id = ?', [data, id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM users WHERE id = ?',
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
};