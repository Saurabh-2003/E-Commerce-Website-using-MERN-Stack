const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/CatchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create Product
exports.createProduct = catchAsyncError(async(req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    const imagesLinks = [];
    
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
            folder:"products",
            width:450,
            crop:"scale",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
   
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
   
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  });

// gET ALL pRODUCTRS    
exports.getAdminAllProducts = catchAsyncError(async (req, res, next) => {
    const apiFeature = new ApiFeatures(Product.find(), req.query).search()
    let products = await apiFeature.query;
    res.status(200).json({
        products,
        success:true,
        message:'Products Fetched Successfully!!'
    })
})

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
    
    let products = await apiFeature.query;
    const productsCount =products.length;


    const filterFeature =  new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);
    const filterProduct = await filterFeature.query
    const filterCount = filterProduct.length
  
    res.status(200).json({
      success: true,
      products: filterProduct,
      productsCount,
      resultPerPage,
      filterCount,

    });
  });
  
  

// Get Product Details : 
exports.getProductDetais = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return  next(new ErrorHandler("Product not Found", 404))
    }
    res.status(200).json({
        success : true,
        product,
    })

})

//Update Product  -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Images Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

  
// Delete A Product -- ADMIN

exports.deleteProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return  next(new ErrorHandler("Product not Found", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted Succesfully"
    })
});


// Create a Review or Update a review :
exports.createProductReview = catchAsyncError(async(req, res, next) =>  {
    console.log("review here ")
    const {rating, comment, productId} = req.body;
    console.table({rating, comment, productId})
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating: Number(rating),
        comment,

    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());


    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString())
            rev.rating = rating,
            rev.comment = comment
        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });

    product.ratings = avg/product.reviews.length;
    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success: true,
    })
});


// Get all reviews of a product :

exports.getProductReviews = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }
    res.status(200).json({
        success: true,
        reviews : product.reviews,
    })
});

// Delete Review : 

exports.deleteReview = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    const reviews= product.reviews.filter(rev =>  rev._id.toString() !== req.query.id.toString());

    //Update the reviews Again :
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg/product.reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    });



    res.status(200).json({
        success: true
    })
});