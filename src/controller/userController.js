const {signUpUser} = require('../service/userService');

async function userController(req,res){
    const userDetail = req.body;
    try {
        const response = await signUpUser(userDetail);
        return res.status(201).json({
            success : true,
            message : 'user created successfully',
            data : response,
            error : {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
}

module.exports = {
    userController
}