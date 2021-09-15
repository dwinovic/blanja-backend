const { response } = require('../helpers');
const address = require('../models/address');

const { createAddress, getItemAddress, updateAddress } = address;

module.exports = {
  createAddress: (req, res) => {
    // Request
    const {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address,
    } = req.body;

    const data = {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address: primary_address ? primary_address : null,
      created_at: new Date(),
    };
    // console.log(data);
    createAddress(data)
      .then(() => {
        response(res, 200, data);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getItemAddress: (req, res) => {
    const id = req.params.id;
    getItemAddress(id)
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateAddress: (req, res) => {
    // Request
    const {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address,
    } = req.body;
    const id = req.params.id;

    const newData = {
      id_user,
      name_address,
      name_recipient,
      phone_recipient,
      address,
      postal_code,
      city,
      primary_address,
    };
    updateAddress(id, newData)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};
