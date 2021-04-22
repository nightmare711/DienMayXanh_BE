const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
router.get('/users', UsersController.getUsers)
router.post('/users', UsersController.postUser)
module.exports = router