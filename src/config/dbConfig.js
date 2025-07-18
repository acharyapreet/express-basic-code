const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

//making connection with database
async function connectDB(){
    try{
        //use mongoose.connect to connect with database
        await mongoose.connect(serverConfig.DB_URL)
        console.log('Database connected successfully')
    }catch(error){
        console.log("Not able to connect with database")
        console.log(error)
    }
}
module.exports = connectDB;