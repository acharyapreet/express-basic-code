const express = require('express')
const { cartController, ModifyToCartUsingId } = require('../controller/cartController')
const { isLoggedIn } = require('../validation/authValidator')
const cartRouter = express.Router()

cartRouter.get('/', isLoggedIn, cartController);
cartRouter.post('/:operation/:productId', isLoggedIn, ModifyToCartUsingId);

module.exports = cartRouter