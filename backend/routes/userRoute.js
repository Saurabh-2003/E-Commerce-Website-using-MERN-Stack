const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, 
        resetPasssword, getUserDetaiils, updatePassword, 
        updateProfile, getAllUser, getSingleUser, deleteUser, 
        updateUserRole } = require("../controllers/userController");
        
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPasssword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser , getUserDetaiils)

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
                                .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
                                .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router