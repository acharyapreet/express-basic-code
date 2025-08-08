const cartSchema = require('../schema/cartSchema');
const InternalServerError = require('../utilities/internalServerError');
const NotFoundError = require('../utilities/notFoundError');

async function createCart(userId){
    try{const newCart = await cartSchema.create({
        users : userId
    })
    return newCart ;
    }
    catch (error) {
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError()

        // console.log('problem at product repository',error)
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await cartSchema.findOne({
            users : userId
        }).populate("items.product");
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function clearCart(userId) {
    try {
        const cart = await cartSchema.findOne({
            users : userId
        });
        if(!cart){
            throw new NotFoundError("Cart");
        }
        cart.items = [];
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}



module.exports = {
    createCart,
    getCartByUserId,
    clearCart
}