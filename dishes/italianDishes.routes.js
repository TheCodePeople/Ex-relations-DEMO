const express = require("express");
const Dish = require("../models/Dish");
const Category = require("../models/Category");
const router = express.Router();

// Create a middleware for posting a dish
const postDishMiddleware = (req, res, next) => {
  const dishName = req.body.name; // Assuming JSON request body
  if (dishName !== "name") {
    next(); // Allow the request to proceed
  } else {
    res.status(400).send("Invalid dish name. 'name' is not allowed.");
  }
};

//  GET all dishes
router.get("/dishes", async (req, res) => {
  try {
    const dishes = await Dish.find();
    return res.status(200).json({ dishes }); // Return the Italian dishes as JSON
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one dish based on certain condition
router.get("/dishes/:dishId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { dishId } = req.params;

    // Use findById() to get the dish based on given id
    const foundDish = await Dish.findById(dishId);

    return res.status(200).json(foundDish);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a dish
router.post("/dishes", postDishMiddleware, async (req, res) => {
  try {
    // Create a new dish using the create() method
    const newDish = await Dish.create(req.body);

    const categoriesIds = newDish.categories;
    console.log(
      "🚀 ~ file: italianDishes.routes.js:48 ~ router.post ~ categoriesIds:",
      categoriesIds
    );

    // Update category by pushing the new dishes to corresponding categories
    await Category.updateMany(
      { _id: { $in: categoriesIds } },
      { $push: { dishes: newDish } },
      { multi: true }
    );

    // Send a response with the newly created dish
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a dish
router.delete("/dishes/:dishId", async (req, res) => {
  try {
    const { dishId } = req.params;

    // use the .findByIdAndDelete() method to search for the dish that its id matches the given id and then delete it
    const foundDish = await Dish.findByIdAndDelete(dishId);

    // Set a condition to check whether the dish exists or not
    if (!foundDish)
      return res.status(400).json({
        message: `Oops, it seems like the dish you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// Create a middleware for updating a dish
router.put("/dishes/:dishId", async (req, res) => {
  try {
    const { dishId } = req.params;

    // the changes you wanna make on the dish
    const updatedDishData = req.body;

    // use the .findByIdAndUpdate() method to search for the dish that its id matches the given id and then update it
    const foundDish = await Dish.findByIdAndUpdate(dishId, updatedDishData, {
      new: true,
    });

    // Set a condition to check whether the dish exists or not
    if (!foundDish)
      return res.status(400).json({
        message: `Oops, it seems like the dish you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedDish: foundDish });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
