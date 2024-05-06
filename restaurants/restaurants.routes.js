const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

//  GET all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants }); // Return the Italian restaurants as JSON
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one restaurant based on certain condition
router.get("/:restaurantId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { restaurantId } = req.params;

    // Use findById() to get the restaurant based on given id
    const foundRestaurant = await Restaurant.findById(restaurantId);

    return res.status(200).json(foundRestaurant);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a restaurant
router.post("/", async (req, res) => {
  try {
    // Create a new restaurant using the create() method
    const newRestaurant = await Restaurant.create(req.body);

    // Send a response with the newly created restaurant
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a restaurant
router.delete("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // use the .findByIdAndDelete() method to search for the restaurant that its id matches the given id and then delete it
    const foundRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    // Set a condition to check whether the restaurant exists or not
    if (!foundRestaurant)
      return res.status(400).json({
        message: `Oops, it seems like the restaurant you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// PUT (Update) a restaurant
router.put("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // the changes you wanna make on the restaurant
    const updatedRestaurantData = req.body;

    // use the .findByIdAndUpdate() method to search for the restaurant that its id matches the given id and then update it
    const foundRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedRestaurantData,
      {
        new: true,
      }
    );

    // Set a condition to check whether the restaurant exists or not
    if (!foundRestaurant)
      return res.status(400).json({
        message: `Oops, it seems like the restaurant you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedRestaurant: foundRestaurant });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
