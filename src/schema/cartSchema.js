const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    users : {
        //refrencing the user model called association
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
        default : 0
    }
})