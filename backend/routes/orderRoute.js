const express  = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const {newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder, updateOrder} = require("../controllers/orderController");

// Place an New Order : 
router.route("/order/new").post(isAuthenticatedUser, newOrder)

// Get single order details 
router.route("/order/:id").get(isAuthenticatedUser,  getSingleOrder);

// Check My orders route for users
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Get the Information of all the orders 
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Update / Delete a Order -- ADMIn
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
                                .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteOrder);



module.exports = router; 