const express = require("express");
const {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("./restaurant.controllers");
const router = express.Router();

//  GET all restaurants
router.get("/", getAllRestaurants);

// GET one restaurant based on certain condition
router.get("/:restaurantId", getRestaurant);

// POST a restaurant
router.post("/", createRestaurant);

// DELETE a restaurant
router.delete("/:restaurantId", deleteRestaurant);

// PUT (Update) a restaurant
router.put("/:restaurantId", updateRestaurant);

module.exports = router;
