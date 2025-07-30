const express = require('express')
const { cartController } = require('../controller/cartController')
const { isLoggedIn } = require('../validation/authValidator')
const cartRouter = express.Router()

cartRouter.get('/', isLoggedIn, cartController)

module.exports = cartRouter