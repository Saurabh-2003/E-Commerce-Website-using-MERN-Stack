const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncError = require("./CatchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = CatchAsyncError(async (req, res, next) => {
    console.log(req.headers); // Log headers
    console.log(req.cookies);
    const {token} = req.cookies;
    console.log(token)
    if(!token){
        return next(new ErrorHandler("Please Login to access this resourece", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRoles =(...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403));

        }

        next();
    }
}