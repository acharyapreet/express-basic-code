const { getCartByUserId, clearCart } = require("../repository/cartRepository");
const NotFoundError = require("../utilities/notFoundError");
const badRequestError = require("../utilities/badRequestError");
const { createOrder, getOrderByUserId, getOrderById, updateOrderStatus } = require("../repository/orderRepository");
const InternalServerError = require("../utilities/internalServerError");
const { findUser } = require("../repository/userRepository");
async function createOrderService(userId, PaymentMethod){
    const cart = await getCartByUserId(userId);
    const user = await findUser({
        _id : cart.users
    })
    if(!cart){
        throw new NotFoundError('Cart');
    }
    if(cart.items.length === 0){
        throw new badRequestError(["Cart is empty, fill it before order"]);
    }

    const orderObject = {};
    orderObject.user = cart.users;
    orderObject.items = cart.items.map(cartItem => {
        return {product : cartItem.product._id, quantity : cartItem.quantity}
    });
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });
    orderObject.address = user.address;
    orderObject.paymentMethod = PaymentMethod ;

    const order = await createOrder(orderObject);
    if(!order){
        throw new InternalServerError();
    }

    await clearCart;

    return order;
}
async function getAllOrdersCreatedByUser(userId) {
    const response = await getOrderByUserId(userId);
    if(!response){
        throw new NotFoundError('user');
    }
    return response;
}

async function getOrderDetailById(orderId) {
    const order = await getOrderById(orderId);
    if(!order){
        throw new NotFoundError('order');
    }
    return order;
}

async function updateOrder(orderId, status){
    const order = await updateOrderStatus(orderId, status);
    if(!order){
        throw new NotFoundError('order');
    }
    return order;
}

module.exports = {
    createOrderService,
    getAllOrdersCreatedByUser,
    getOrderDetailById,
    updateOrder
}