const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const WrapAsync=require("../utils/WrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const controllersUser=require("../controllers/User.js");

//signup post route
router.route("/signup")
.get(controllersUser.renderSignupForm)
.post( WrapAsync(controllersUser.signup));


//login route
router.route("/login")
.get( controllersUser.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), controllersUser.login);

router.get("/logout", controllersUser.logout);



module.exports = router;


