/* eslint-disable no-undef */
const nodemailer = require('nodemailer');
const bodyMail = require('./bodyMail');

const verifiedEmail = (emailTo, nameTo, token) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  });

  transporter
    .sendMail({
      // eslint-disable-next-line no-undef
      from: `CEO Blanja.com | ${process.env.NODEMAILER_AUTH_USER}`, // sender address
      to: emailTo, // list of receivers
      subject: 'Blanja.com | Email Verification', // Subject line
      html: bodyMail(token, nameTo), // html body
    })
    .then(() => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = verifiedEmail;
