const express=require('express');
const router=express.Router();
const WrapAsync=require("../utils/WrapAsync");
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedin,upload.single("listing[image]"),validateListing,WrapAsync(listingController.createListing));

//search
router
.get("/search",WrapAsync(listingController.search));

//add new listing route
router.get("/new",isLoggedin,listingController.renderNewForm);

//show route,Update route,Delete route
router
.route("/:id")
.get(WrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing,WrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,WrapAsync(listingController.deleteListing));





//Edit Route
router.get("/:id/edit",isLoggedin,isOwner,WrapAsync(listingController.renderEditForm));

module.exports=router;
