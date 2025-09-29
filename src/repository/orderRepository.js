const Order = require('../schema/orderSchema');
const orderSchema = require('../schema/orderSchema');
const BadRequestError = require('../utilities/badRequestError');
const InternalServerError = require('../utilities/internalServerError');

async function createOrder(orderDetails) {
    try{const order = await orderSchema.create(orderDetails) ;
    return order ;
    }catch(error){
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();

    }
}
async function getOrderByUserId(userId){
    try{
        const order = await orderSchema.find({user: userId}).populate('items.product');
        return order;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}

async function getOrderById(orderId) {
    try {
        const order = await orderSchema.findById(orderId).populate('items.product');
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function updateOrderStatus(orderId, status){
    try {
        const order = await Order.findByIdAndUpdate(orderId, {status: status}, {new : true});
        console.log(order);
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus
}