const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const cloudinary = require('cloudinary');

//Register a user : 
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,  {
    //     folder:"avatars",
    //     width:150,
    //     crop:"scale",
    // });
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar:{
            public_id:"id",
            url:"myProfileUrl"
            // public_id:myCloud.public_id,
            // url:myCloud.secure_url,
        }
    });
    sendToken(user, 201, res);
});

// Login a User : 
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const {email, password} = req.body;
    //checking if the user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid Email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
    
})

// Logout User :
exports.logout= catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
})

// Forget Passowrd :
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get reset Password Token : 
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


    const message = `Your Password token is  :-  ${resetPasswordUrl}  \nIf you have not requested then, Please ignore it`;
    const dummy = "mail is here";
    try {
        await sendEmail({
            email: user.email,
            subject:'Ecommerce Password Recovery',
            message
        });
        res.status(200).json({
            success : true,
            message : `Email sent to ${user.email} successfully`,  
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});



// Reset Password :
exports.resetPasssword = catchAsyncErrors(async(req, res, next) => {
    // Creating Token hash : 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()},
    });

    //If the User id not Found
    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or Expired", 404));
    }

    //Both Password Do not Match :
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Both the Password do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

// Get User Details :
exports.getUserDetaiils = catchAsyncErrors(async(req, res, next) => {
    const user =  await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user,
    })
});

// Update user password:
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user =  await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old passord is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next (new ErrorHandler("Password Does not Match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Update user Profile:
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email : req.body.email,
    };

    // Cloudinary  :
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder:"avatar",
            width:150,
            crop:"scale",
        })

        newUserData.avatar = {
            public_id : myCloud.public_id,
            url:myCloud.secure_url
        };
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true
    });

    res.status(200).json({
        success : true
    })
});

//get all user 
exports.getAllUser = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        success : true,
        users,
    });
});

//get single user details - ADMIN 
exports.getSingleUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`))
    }



    res.status(200).json({
        success : true,
        user,
    });
});



// Update User Role -- ADMIN :
exports.updateUserRole = catchAsyncErrors(async(req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email : req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true
    });

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`));
    }

    res.status(200).json({
        success : true
    })
});



// Delete User -- ADMIN : 

exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
   
    // We will ass cloudinary Later 
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`));
    }

    await user.deleteOne();

    res.status(200).json({
        success : true,
        message : "User Deleted"
    })
});
