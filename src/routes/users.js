const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { verifyAccess } = require('../middleware/auth');
const { uploadFile } = require('../middleware/multer');

router
  .get('/', userController.getAllUsers)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .get('/:id', verifyAccess, userController.getUserId)
  .post(
    '/:id',
    verifyAccess,
    (req, res, next) => uploadFile(req, res, next, 'image'),
    userController.updateUser
  )
  .delete('/:id', verifyAccess, userController.deleteUser);

module.exports = router;