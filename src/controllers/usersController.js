/* eslint-disable no-unreachable */
const {
  response,
  srcResponse,
  pagination,
  srcFeature,
  requestNewPasswordVerification,
} = require('../helpers');
const UserModel = require('../models/users');
const short = require('short-uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifiedEmail = require('../helpers/verifiedEmail');
const cloudinary = require('cloudinary').v2;
const { configCloudinary } = require('../middleware/cloudinary');
cloudinary.config(configCloudinary);

// eslint-disable-next-line no-undef
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  getAllUsers: async (req, res, next) => {
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
              meta,
              {},
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
  getUserByEmail: (req, res, next) => {
    const email = req.params.emailUser;
    UserModel.getUserEmail(email)
      .then((result) => {
        if (result.length === 0) {
          const message = 'Account not found!';
          response(res, 404, {}, message, 'Failed');
        }
        const data = result[0];
        const token = jwt.sign(
          {
            id: data.idUser,
            email: data.email,
            role: data.role,
            name: data.name,
            verified: data.verified,
            image: data.image,
          },
          privateKey,
          { expiresIn: '8h' }
        );
        requestNewPasswordVerification(email, data.name, token);
        response(res, 200, 'Email verification have been send');
      })
      .catch(next);
  },
  verifyTokenUser: (req, res) => {
    const decodeResult = req.user;
    UserModel.getUserEmail(decodeResult.email).then((result) => {
      const dataResult = result[0];
      // delete dataResult.password;
      response(res, 200, dataResult);
    });
  },
  createUser: (req, res, next) => {
    const { email, password, name, role, phoneNumber, storeName } = req.body;

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
      // eslint-disable-next-line no-undef
      image: null,
      storeName,
      updatedAt: new Date(),
    };
    // console.log('data user', dataUser);
    // console.log(dataUser);
    UserModel.createUser(dataUser)
      .then(() => {
        // const email = 'cahyaulin@gmail.com';
        // JWT Token
        const token = jwt.sign(
          {
            id: dataUser.idUser,
            email: dataUser.email,
            role: dataUser.role,
            name: dataUser.name,
            verified: 0,
          },
          privateKey,
          { expiresIn: '24h' }
        );
        verifiedEmail(dataUser.email, dataUser.name, token);
        response(res, 200);
      })
      .catch(next);
  },
  updateUser: async (req, res, next) => {
    // Request
    const id = req.params.id;
    const {
      email,
      name,
      role,
      phoneNumber,
      gender,
      verified,
      storeName,
      description,
      image: imageRequest,
      imageId,
    } = req.body;
    // UPDATE AVATAR
    console.log('req.body:', req.body);

    const fileUpload = req.file;
    // console.log('fileUpload', fileUpload);

    // DESTORY OLD IMAGE
    // if (imageId) {
    //   await cloudinary.uploader.destroy(imageId, function (result) {
    //     console.log('destroy:', result);
    //   });
    // }

    const newData = {
      email,
      name,
      role,
      verified,
      phoneNumber,
      gender,
      storeName,
      description,
      imageUrl: fileUpload ? fileUpload.path : imageRequest,
      imageId: fileUpload ? fileUpload.filename.split('/').pop() : imageId,
      updatedAt: new Date(),
    };
    // console.log('newData to db', newData);
    UserModel.updateUser(id, newData)
      .then(async () => {
        // try {
        //   if (
        //     // eslint-disable-next-line no-undef
        //     // oldAvatar === `${process.env.HOST_SERVER}/files/user-default.png`
        //   ) {
        //     response(res, 200);
        //   } else if (dataFilesRequest) {
        //     // const getAvatarName = oldAvatar.split('/')[4];
        //     // await fs.unlinkSync(`public/images/${getAvatarName}`);
        //     // console.log(`successfully deleted ${getAvatarName}`);
        //   }
        // } catch (err) {
        //   console.error('there was an error:', err.message);
        // }

        response(res, 200, newData);
      })
      .catch(async (err) => {
        // console.log('err', err);
        try {
          // await fs.unlinkSync(`public/images/${avatar}`);
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
          message = 'Account not found!';
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
        const token = jwt.sign(
          {
            email: dataUserRes.email,
            role: dataUserRes.role,
            name: dataUserRes.name,
          },
          privateKey,
          { expiresIn: '12h' }
        );

        const refreshToken = jwt.sign(
          {
            email: dataUserRes.email,
            role: dataUserRes.role,
            name: dataUserRes.name,
          },
          privateKey,
          { expiresIn: `${24 * 7}h` }
        );

        delete dataUserRes.password;
        dataUserRes.token = token;
        dataUserRes.refresh = refreshToken;

        response(res, 200, dataUserRes, {}, 'Login success');
      })
      .catch(next);
  },
  getUserAddress: (req, res, next) => {
    const idUser = req.params.idUser;
    UserModel.getUserAddress(idUser)
      .then((result) => {
        const data = result;
        response(res, 200, data);
      })
      .catch(next);
  },
};
