const UserModel = require('../models/users');

module.exports = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers()
      .then((result) => {
        const users = result;
        res.status(201).json({
          message: 'Success Get All Users',
          data: users,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Internal server error',
        });
      });
  },
  getUserId: (req, res) => {
    const id = req.params.id;
    UserModel.getUserId(id)
      .then((result) => {
        const data = result;
        console.log(data);
        // if(data)
        res.status(201).json({
          message: 'Success',
          data: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: 'User not found',
        });
      });
    console.log(id);
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
    console.log(dataUser);
    UserModel.createUser(dataUser)
      .then(() => {
        res.status(201).json({
          message: 'User success register',
        });
      })
      .then((err) => {
        res.status(500).json({
          message: 'User failed to register',
        });
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
    };
    UserModel.updateUser(id, newData)
      .then(() => {
        res.status(201).json({
          message: 'Success user update',
        });
      })
      .catch((errr) => {
        res.status(500).json({
          message: 'User failed to update user',
        });
      });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    UserModel.deleteUser(id)
      .then(() => {
        res.status(201).json({
          message: 'Success user deleted',
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed to delete user',
        });
      });
  },
};