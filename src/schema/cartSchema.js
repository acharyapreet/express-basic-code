const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    users : {
        //refrencing the user model called association
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',
        unique : true
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
},{
    timestamps : true
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart