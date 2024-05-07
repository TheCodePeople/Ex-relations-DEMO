const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .populate("restaurant", "name");
    return res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const getAllReviewByRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ restaurant: id }).populate([
      "restaurant",
      "customer",
    ]);
    console.log("🚀 ~ getAllReviewByRestaurant ~ reviews:", reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const foundReview = await Review.findById(reviewId);

    return res.status(200).json(foundReview);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const foundReview = await Review.findByIdAndDelete(reviewId);

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
};
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const updatedReviewData = req.body;

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
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  getAllReviewByRestaurant,
};
