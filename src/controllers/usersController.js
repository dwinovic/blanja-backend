const { response, srcResponse, pagination } = require('../helpers');
const UserModel = require('../models/users');

module.exports = {
  getAllUsers: async(req, res, next) => {
    try {
      // PAGINATION
      if (!req.query.src) {
        const result = await pagination(req, res, next, UserModel.getAllUsers);
        // console.log(Object.keys(result));
        const {
          totalPage,
          currentPage,
          limit,
          totalData,
          data,
          error,
          sortBy,
        } = result;

        // console.log(1, totalPage);

        const meta = {
          currentPage,
          totalData,
          limit,
          totalPage,
          sortBy,
        };
        // console.log(2, data.length);
        // return;
        if (data.length === 0) {
          // console.log(error);
          srcResponse(res, 404, meta, {}, error, error);
        } else {
          srcResponse(res, 200, meta, data);
        }
      }
      if (req.query.src) {
        srcFeature(req, res, next, UserModel.searchUsers).then(() => {
          // console.log(Object.keys(res.result));

          const { data, meta, error } = res.result;

          if (error.statusCode && error.message) {
            srcResponse(
              res,
              error.statusCode,
              meta, {},
              error.message,
              error.message
            );
          } else {
            srcResponse(res, 200, meta, data, {});
          }
        });
      }
    } catch (error) {
      next(error);
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