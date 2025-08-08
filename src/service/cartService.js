const { getCartByUserId, clearCart } = require("../repository/cartRepository");
const { findId } = require("../repository/productRepository");
const AppError = require("../utilities/appError");
const BadRequestError = require("../utilities/badRequestError");
const InternalServerError = require("../utilities/internalServerError");
const NotFoundError = require("../utilities/notFoundError");

async function getCart(userId) {

    const cart = await getCartByUserId(userId);
    if(!cart){
        console.log('cart not found');
        throw new NotFoundError("cart");
    }
    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true){
    const quantityValue = (shouldAdd == true) ? 1 : -1;
    const cart = await getCart(userId);
    const product = await findId(productId);
    if(!product){
        throw new NotFoundError('product')
    }
    if(!product.inStock && product.quantity <= 0){
        throw new BadRequestError(["Product is out of stock"])
    }

    //May the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(item => {
        if(item.product._id.equals(productId)){
            if(shouldAdd){
                if(product.quantity >= item.quantity + 1){
                    item.quantity +=quantityValue ;
                }
                else{
                    throw new AppError("Quantity of product requested is not available", 404)
                }
            }else{
                if(item.quantity > 0){
                    item.quantity +=quantityValue ;
                    if(item.quantity == 0){
                        cart.items = cart.items.filter(item => item.product._id != productId);
                        foundProduct = true;
                        return;
                    }
                    // else{
                    //     throw new NotFoundError("Quantity of product requested is not available", 404)
                    // }
                }else{
                    throw new AppError("Quantity of product requested is not available", 404)

                }
            }
            
            foundProduct = true;
        }
    });
    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
                product : productId,
                quantity : 1
            })
        }else{
            throw new NotFoundError("Product in the cart")
        }
    }
    await cart.save();

    return cart ;
}

async function clearCartService(userId) {
    const response = await clearCart(userId);
    if(!response){
        throw new InternalServerError()
    }
    return response;
}


module.exports = {
    getCart,
    modifyCart,
    clearCartService
}