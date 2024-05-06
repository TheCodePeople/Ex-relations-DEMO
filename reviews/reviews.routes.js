const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json({ reviews: reviews });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one review by review id
router.get("/:reviewId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { reviewId } = req.params;

    // Use findById() to get the review based on it's id
    const foundReview = await Review.findById(reviewId);

    return res.status(200).json(foundReview);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a review
router.post("/", async (req, res) => {
  try {
    // Create a new review using the create() method
    const newReview = await Review.create(req.body);

    // Send a response with the newly created review
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a review
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    // use the .findByIdAndDelete() method to search for the Review that its id matches the given id and then delete it
    const foundReview = await Review.findByIdAndDelete(reviewId);

    // Set a condition to check whether the review exists or not
    if (!foundReview)
      return res.status(400).json({
        message: `Oops, it seems like the review you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// Update a review
router.put("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    // the changes you wanna make on the review
    const updatedReviewData = req.body;

    // use the .findByIdAndUpdate() method to search for the review that its id matches the given id and then update it
    const foundReview = await Review.findByIdAndUpdate(
      reviewId,
      updatedReviewData,
      {
        new: true,
      }
    );

    // Set a condition to check whether the review exists or not
    if (!foundReview)
      return res.status(400).json({
        message: `Oops, it seems like the review you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedReview: foundReview });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
