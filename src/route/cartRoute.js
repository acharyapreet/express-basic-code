const express = require('express')
const { cartController, ModifyToCartUsingId, clearCartController } = require('../controller/cartController')
const { isLoggedIn } = require('../validation/authValidator')
const cartRouter = express.Router()

cartRouter.get('/', isLoggedIn, cartController);
cartRouter.post('/:operation/:productId', isLoggedIn, ModifyToCartUsingId);
cartRouter.delete('/products',isLoggedIn , clearCartController);

module.exports = cartRouter