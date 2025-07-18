<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');

// making a app object of express
const app = express();

//these are deserilizers
//used to read/parse the incoming request
app.use(bodyParser.json());
//extended true means we can parse nested objects and it remove the warning
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message : "pong"})
})

//starting the server
app.listen(serverConfig.PORT, async() => {
    await connectDB();
    console.log(`server is running on port ${serverConfig.PORT}`);
}) 
=======
const express = require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const bodyParser = require('body-parser')
const User = require('./schema/userSchema')
const userRouter = require('./route/userRoute')
const cartRouter = require('./route/cartRoute')
const authRouter = require('./route/authRoutes')
const cookieParser = require('cookie-parser')
const { isLoggedIn } = require('./validation/authValidator')
const uploader = require('./middleware/multerMiddleware')
const cloudinary = require('./config/cloudinaryConfig')
const fs = require('fs/promises')
const imageRouter = require('./route/imageRoutes')
//making express app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.text())
app.use(cookieParser())

//routing
app.use('/users',userRouter)
app.use('/cart',cartRouter)
app.use('/auth',authRouter)
app.use('/products',imageRouter)
//making demo api
app.post('/pong', isLoggedIn, (req,res) => {
    console.log(req.body)
    console.log(req.cookies)
    return res.json({message : "pong"})
})

app.post('/photos', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file)
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log('result from cloudinary',result)
    await fs.unlink(req.file.path)
    return res.json({
        message : 'ok'
    })
})
//making server
app.listen(serverConfig.PORT, async () => {
    //connecting with database
     connectDB()
    console.log(`server is running on port ${serverConfig.PORT}`)

    // const newUser = await User.create({
    //     name : "Preet Acharya",
    //     email : "abc@gmail.com",
    //     password : "hello123",
    //     mobileNo : 1234567890
    // })
    // console.log("Created new user");
    // console.log(newUser);

})

>>>>>>> master
