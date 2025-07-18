const express = require('express');
const { authController } = require('../controller/auhController');
const authRouter = express.Router();

authRouter.post('/login',authController)

module.exports = authRouter;