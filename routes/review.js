const express=require('express');
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middleware.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");

const ReviewController=require("../controllers/reviews.js");



//reviews
//post Route
router.post("/",isLoggedin,validateReview,WrapAsync(ReviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,WrapAsync(ReviewController.deleteReview));

module.exports=router;