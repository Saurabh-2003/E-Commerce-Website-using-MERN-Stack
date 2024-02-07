const Order = require("../models/orderModel");
const Product =  require ("../models/productModel");
const catchAsyncError = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/errorHandler");


// Create a New Order : 

exports.newOrder = catchAsyncError ( async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create( {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success : true,
        order
    });
})

// get Single Order Details : 
exports.getSingleOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});

// get Logged in User Orders  : 
exports.myOrders = catchAsyncError(async(req, res, next) => {
    console.log("Request in server")
    const orders = await Order.find({user : req.user._id});
    res.status(200).json({
        success: true,
        orders
    });
});


// get all Orders  : -- ADMIN
exports.getAllOrders = catchAsyncError(async(req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});


//Update Order Status -- ADMIN 

exports.updateOrder = catchAsyncError( async (req, res, next) => {
    const order =await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    // If order was already delivered 
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order has been Already Delivered", 400));
    }
    // Update quantity of the order decreased after the order is delivered
    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    });

    //update order status from the get request body
    order.orderStatus = req.body.status;

    // Mark time and date of delivery
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success : true,
    })

});

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}


// Delete Order -- ADMIN

exports.deleteOrder = catchAsyncError(async(req, res, next) => {
    const orders = await Order.findById(req.params.id);

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    //  orders.orderItems.forEach(async (order) => {
    //     await updateStockDelete(order.product, order.quantity)
    // });
    await orders.deleteOne();
    res.status(200).json({
        success: true
    });
});

// async function updateStockDelete(id, quantity){
//     const product = await Product.findById(id);
//     product.stock += quantity;
//     await product.save({validateBeforeSave: false});
// }



