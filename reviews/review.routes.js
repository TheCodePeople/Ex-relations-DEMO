const express = require("express");
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("./review.controllers");
const router = express.Router();

// GET all reviews
router.get("/", getAllReviews);

// GET one review by review id
router.get("/:reviewId", getReview);

// POST a review
router.post("/", createReview);

// DELETE a review
router.delete("/:reviewId", deleteReview);

// Update a review
router.put("/:reviewId", updateReview);

module.exports = router;
