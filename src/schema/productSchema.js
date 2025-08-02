const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type : String,
        required : [true,'product name is required'],
        trim : true
    },
    productImage : {
        type : String
    },
    description : {
        type : String
    },
    price : {
        type : Number,
        required : [true,'price is required']
    },
    quantity : {
        type : Number,
        default : 10
    },
    category : {
        type : String,
        enum : ['veg', 'drink'],
        default : 'veg'
    },
    inStock : {
        type : Boolean,
        default : true,
        required : [true, 'in stock is required']
    }
},{
    timestamps : true
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;