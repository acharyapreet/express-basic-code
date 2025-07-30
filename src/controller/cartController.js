const { getCart } = require("../service/cartService");
const AppError = require("../utilities/appError");

async function cartController(req, res) {
    try {
        const userId = req.user.id; // <-- Fix is here
        const cart = await getCart(userId);

        return res.status(200).json({
            success: true,
            data: cart,
            error: {},
            message: "successfully fetched the cart"
        });
    } catch (error) {
        console.log('error in fetching cart ', error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                data: {},
                error: error,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error,
            message: "something went wrong"
        });
    }
}

module.exports = {
    cartController
};
