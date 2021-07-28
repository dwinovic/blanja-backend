const { response, srcResponse, pagination, srcFeature } = require('../helpers');
const UserModel = require('../models/users');
const short = require('short-uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// eslint-disable-next-line no-undef
const privateKey = process.env.PRIVATE_KEY;

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
      if (req.query.src || req.query.category) {
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
    const { email, password, name, role, phoneNumber, gender, born } = req.body;

    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // console.log('hash', hash);

    // UUID
    const newUID = short.generate();

    const dataUser = {
      idUser: newUID,
      email,
      password: hash,
      name,
      role,
      phoneNumber,
      gender,
      born,
      updatedAt: new Date(),
    };
    // console.log('data user', dataUser);
    // console.log(dataUser);
    UserModel.createUser(dataUser)
      .then(() => {
        response(res, 200);
      })
      .catch(next);
  },
  updateUser: async(req, res, next) => {
    // Request
    const id = req.params.id;
    const { email, password, name, role, phoneNumber, gender } = req.body;

    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const dataFilesRequest = req.file;
    const avatar = dataFilesRequest.filename;
    const newData = {
      email,
      password: hash,
      name,
      role,
      phoneNumber,
      gender,
      imageProfile: avatar,
      updatedAt: new Date(),
    };

    // OLD Images
    const oldAvatar = await UserModel.getUserId(id)
      .then((result) => {
        const data = result[0].imageProfile;
        return data;
      })
      .catch(next);
    // console.log(oldAvatar);

    UserModel.updateUser(id, newData)
      .then(async() => {
        try {
          await fs.unlinkSync(`public/images/${oldAvatar}`);
          console.log(`successfully deleted ${oldAvatar}`);
        } catch (err) {
          console.error('there was an error:', err.message);
        }

        response(res, 200);
      })
      .catch(async(err) => {
        try {
          await fs.unlinkSync(`public/images/${avatar}`);
          // console.log(`successfully deleted ${image}`);
        } catch (err) {
          // console.error('there was an error:', error.message);
          next();
        }

        next(err);
      });
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
    const dataUserLogin = { email, password };
    // console.log(dataUserLogin);
    UserModel.getUserEmail(dataUserLogin.email)
      .then((result) => {
        const dataUserRes = result[0];

        // console.log(dataUserRes);
        let message;

        // Email Validation
        if (!dataUserRes) {
          message = 'Email not found!';
          response(res, 404, {}, message, 'Cannot login');
        }
        // Password Validation
        const { password: passwordResponse } = dataUserRes;
        // console.log('passwordResponse', passwordResponse);
        const compareHashPassword = bcrypt.compareSync(
          password,
          passwordResponse
        );
        if (!compareHashPassword) {
          message = 'Password wrong!';
          response(res, 404, {}, message, 'Cannot login');
        }
        // JWT Token
        const token = jwt.sign({
            email: dataUserRes.email,
            role: dataUserRes.role,
            name: dataUserRes.name,
          },
          privateKey, { expiresIn: '24h' }
        );

        const refreshToken = jwt.sign({
            email: dataUserRes.email,
            role: dataUserRes.role,
            name: dataUserRes.name,
          },
          privateKey, { expiresIn: '168h' }
        );

        delete dataUserRes.password;
        dataUserRes.token = token;
        dataUserRes.refresh = refreshToken;

        response(res, 200, dataUserRes, {}, 'Login success');
      })
      .catch(next);
  },
};