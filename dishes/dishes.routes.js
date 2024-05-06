const express = require("express");
const Dish = require("../models/Dish");
const router = express.Router();

//TODO: Create a route to find dishes based on their categories

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
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find()
      .populate("categories", "name")
      .populate("restaurant", "name");
    return res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

router.post("/category", async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const dishes = await Dish.find()
      .where("categories")
      .all(categoryIds)
      .populate(["categories", "restaurant"]);

    return res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one dish based on dish id
router.get("/:dishId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { dishId } = req.params;

    // Use findById() to get the dish based on given id
    const foundDish = await Dish.findById(dishId).populate([
      "categories",
      "restaurant",
    ]);

    return res.status(200).json(foundDish);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a dish
router.post("/", postDishMiddleware, async (req, res) => {
  try {
    // Create a new dish using the create() method
    const newDish = await Dish.create(req.body);

    // Send a response with the newly created dish
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a dish
router.delete("/:dishId", async (req, res) => {
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

// Update (PUT) a dish
router.put("/:dishId", async (req, res) => {
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
