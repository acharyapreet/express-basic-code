const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    //items having array of products refrence through product
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ],
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : 'ORDERED',
        enum : ['ORDERED', 'CANCELED', 'DELIVERED', 'OUT_FOR_DELIVERY', 'PROCESSING']
    },
    address : {
        type : String,
        minLength : [10,'address should be minimum 10 characters long']
    },
    paymentMethod : {
        type : String,
        enum : ['ONLINE', 'CASH'],
        default : 'CASH'
    }
},{
    timestamps : true

})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order