const express = require('express')
const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const { createOrderController, getAllOrdersByUser, getOrder, cancelOrder, changeOrderStatus } = require('../controller/orderContorller');
const orderRouter = express.Router()

orderRouter.post('/', isLoggedIn, createOrderController)
orderRouter.get('/', isLoggedIn, getAllOrdersByUser)
orderRouter.get('/:orderId', isLoggedIn, getOrder)
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder)
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus)

module.exports = orderRouter;