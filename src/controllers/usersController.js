const { response } = require('../helpers');
const UserModel = require('../models/users');

module.exports = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers()
      .then((result) => {
        const users = result;
        response(res, 200, users);
      })
      .catch((err) => {
        // console.log(err);
        response(res, 500, {}, err);
      });
  },
  getUserId: (req, res) => {
    const id = req.params.id;
    UserModel.getUserId(id)
      .then((result) => {
        const data = result;
        response(res, 200, data);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  createUser: (req, res) => {
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
      .then((err) => {
        response(res, 500, {}, err);
      });
  },
  updateUser: (req, res) => {
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
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    UserModel.deleteUser(id)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};