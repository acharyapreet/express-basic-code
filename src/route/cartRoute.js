const express = require('express')
const { cartController } = require('../controller/cartController')
const cartRouter = express.Router()

cartRouter.post('/',cartController)

module.exports = cartRouter