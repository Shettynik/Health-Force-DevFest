const express = require("express");
const { loginController, registerController, logoutController, isLoggedIn } = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(loginController);
router.route("/register").post(registerController);
router.route("/logout").post(logoutController);
router.route("/checkActiveUser").get(isLoggedIn);

module.exports = router;