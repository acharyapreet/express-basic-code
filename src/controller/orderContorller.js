const { createOrderService, getAllOrdersCreatedByUser, getOrderDetailById, updateOrder } = require("../service/orderService");
const AppError = require("../utilities/appError");

async function createOrderController(req, res) {
    try {
        const userId = req.user.id; // <-- Fix is here
        const order = await createOrderService(userId, req.body.paymentMethod);

        return res.status(201).json({
            success: true,
            data: order,
            error: {},
            message: "successfully created the order"
        });
    } catch (error) {
        console.log('error in creating order ', error);
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

async function getAllOrdersByUser(req, res) {
    try {
        const userId = req.user.id; // <-- Fix is here
        const order = await getAllOrdersCreatedByUser(userId);

        return res.status(200).json({
            success: true,
            data: order,
            error: {},
            message: "successfully fetched the order"
        });
    } catch (error) {
        console.log('error in fetching order ', error);
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
async function getOrder(req, res) {
    try {
        const order = await getOrderDetailById(req.params.orderId);

        return res.status(200).json({
            success: true,
            data: order,
            error: {},
            message: "successfully fetched the order"
        });
    } catch (error) {
        console.log('error in fetching order ', error);
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
async function cancelOrder(req, res) {
    try {
        const order = await updateOrder(req.params.orderId,"CANCELED" );

        return res.status(200).json({
            success: true,
            data: order,
            error: {},
            message: "successfully cancled the order"
        });
    } catch (error) {
        console.log('error in cancling order ', error);
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

async function changeOrderStatus(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, req.body.status );

        return res.status(200).json({
            success: true,
            data: order,
            error: {},
            message: "successfully changed the order status"
        });
    } catch (error) {
        console.log('error in changing order status ', error);
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
    createOrderController,
    getAllOrdersByUser,
    getOrder,
    cancelOrder,
    changeOrderStatus
}
