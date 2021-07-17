const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')

router
  .get('/', userController.getAllUsers)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .get('/:id', userController.getUserId)
  .post('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

module.exports = router
