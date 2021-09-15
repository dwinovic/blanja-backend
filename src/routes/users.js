const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { verifyAccess, superAccess } = require('../middleware/auth');
const { uploadFile } = require('../middleware/multer');

router
  .get('/', verifyAccess, superAccess, userController.getAllUsers)
  .get('/verify-token', verifyAccess, userController.verifyTokenUser)
  .get('/address/:idUser', verifyAccess, userController.verifyTokenUser)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .get('/:id', verifyAccess, userController.getUserId)
  .post(
    '/:id',
    verifyAccess,
    (req, res, next) => uploadFile(req, res, next, 'image'),
    userController.updateUser
  )
  .post('/change-password/:emailUser', userController.getUserByEmail)

  .delete('/:id', verifyAccess, superAccess, userController.deleteUser);

module.exports = router;
