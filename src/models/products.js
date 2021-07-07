const connection = require('../config/db_connection');
const { querySQL } = require('../helpers');

module.exports = {
  getAllProducts: () => {
    return querySQL(`SELECT * FROM products`);
  },
  getItemProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM products WHERE id = ?`,
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
  createNewProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO products SET ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE products SET ? WHERE id = ?`, [data, id],
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
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM products WHERE id = ?`,
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