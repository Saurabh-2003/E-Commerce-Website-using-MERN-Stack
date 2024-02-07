const catchAsyncError = require("../middleware/CatchAsyncError");
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.processPayment = catchAsyncError(async (req, res, next) => {
    console.log("Request reached here in the server");
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce"
        },
        description:"Testing my e-commerce"
    })

    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {

    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
