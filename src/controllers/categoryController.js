const { response } = require('../helpers');
const category = require('../models/category');

const {
  createCategory,
  getAllCategory,
  getItemCategory,
  updateCategory,
  deleteCategory,
} = category;

module.exports = {
  createCategory: (req, res) => {
    const { nameCategory } = req.body;
    const data = { nameCategory };
    // console.log(data);
    createCategory(data)
      .then(() => {
        response(res, 200, data);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getAllCategory: (req, res) => {
    getAllCategory()
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getItemCategory: (req, res) => {
    const id = req.params.id;
    getItemCategory(id)
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateCategory: (req, res) => {
    const { nameCategory } = req.body;
    const id = req.params.id;
    const newData = { nameCategory, updatedAt: new Date() };
    updateCategory(id, newData)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  deleteCategory: (req, res) => {
    const id = req.params.id;
    deleteCategory(id)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};
