const express = require('express')
const { signUpUSerController } = require('../../../task manager/src/controller/userController');
const userRouter = express.Router()

userRouter.post('/',signUpUSerController)

module.exports = userRouter;


