const express = require("express");
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  getAllReviewByRestaurant,
} = require("./review.controllers");
const router = express.Router();

// GET all reviews
router.get("/", getAllReviews);

// GET all reviews
router.get("/restaurant/:id", getAllReviewByRestaurant);

// GET one review by review id
router.get("/:reviewId", getReview);

// POST a review
router.post("/", createReview);

// DELETE a review
router.delete("/:reviewId", deleteReview);

// Update a review
router.put("/:reviewId", updateReview);

module.exports = router;
