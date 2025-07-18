const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        // match : ['^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$','Please enter a valid email address']
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    mobileNo : {
        type : Number,
        required : true,
        unique : true,
        minlength : 10,
        maxlength : 10
    },

},{
    timestamps : true
});

userSchema.pre('save',async function(){
    // here you can modify the user before saving it
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
});

const User = mongoose.model('User',userSchema);
module.exports = User;