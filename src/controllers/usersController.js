const { response, srcResponse } = require('../helpers');
const UserModel = require('../models/users');

module.exports = {
  getAllUsers: (req, res, next) => {
    // pagination
    if (!req.query.src) {
      const { currentPage, limit, data, totalPage, sortBy, error, totalData } =
      res.pagination;

      const meta = {
        currentPage,
        totalData,
        limit,
        totalPage,
        sortBy,
      };
      // console.log(data);
      if (data.length === 0) {
        // console.log(error);
        srcResponse(res, 404, meta, {}, error, error);
      } else {
        srcResponse(res, 200, meta, data);
      }
    }
  },
  getUserId: (req, res, next) => {
    const id = req.params.id;
    UserModel.getUserId(id)
      .then((result) => {
        const data = result;
        response(res, 200, data);
      })
      .catch(next);
  },
  createUser: (req, res, next) => {
    const { email, password, name, phoneNumber, gender, born } = req.body;
    const dataUser = {
      email,
      password,
      name,
      phoneNumber,
      gender,
      born,
    };
    // console.log(dataUser);
    UserModel.createUser(dataUser)
      .then(() => {
        response(res, 200);
      })
      .then(next);
  },
  updateUser: (req, res, next) => {
    const id = req.params.id;
    const { email, password, name, phoneNumber, gender } = req.body;
    const newData = {
      email,
      password,
      name,
      phoneNumber,
      gender,
      updatedAt: new Date(),
    };
    UserModel.updateUser(id, newData)
      .then(() => {
        response(res, 200);
      })
      .catch(next);
  },
  deleteUser: (req, res, next) => {
    const id = req.params.id;
    UserModel.deleteUser(id)
      .then(() => {
        response(res, 200);
      })
      .catch(next);
  },
  loginUser: (req, res, next) => {
    const { email, password } = req.body;
    const dataUser = { email, password };
    // console.log(dataUser);
    UserModel.getUserEmail(dataUser.email)
      .then((result) => {
        // console.log(res);
        response(res, 200);
      })
      .catch(next);
  },
};