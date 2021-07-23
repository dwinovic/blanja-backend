const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { uploadFile } = require('../middleware/multer');

router
  .get('/', userController.getAllUsers)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .get('/:id', userController.getUserId)
  .post(
    '/:id',
    (req, res, next) => uploadFile(req, res, next, 'image'),
    userController.updateUser
  )
  .delete('/:id', userController.deleteUser);

module.exports = router;