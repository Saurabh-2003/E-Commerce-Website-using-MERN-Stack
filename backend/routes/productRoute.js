const express = require("express");
const {getAdminAllProducts, getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetais, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router  = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)


router.route("/product/:id").get(getProductDetais);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);



module.exports = router