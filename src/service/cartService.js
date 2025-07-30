const { getCartByUserId } = require("../repository/cartRepository");
const NotFoundError = require("../utilities/notFoundError");

async function getCart(userId) {

    const cart = await getCartByUserId(userId);
    if(!cart){
        console.log('cart not found');
        throw new NotFoundError("cart");
    }
    return cart;
}


module.exports = {
    getCart
}