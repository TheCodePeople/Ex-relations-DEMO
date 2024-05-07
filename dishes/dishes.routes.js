const express = require("express");
const Dish = require("../models/Dish");
const router = express.Router();
const fileUpload = require("../middlewares/fileUpload");
const path = require("path");
const fs = require("fs");

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

// POST method to find dishes based on their categories
// NOTE: This is a POST method because we need to provide an array of categories in order to get data.
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
router.post("/", fileUpload.single("image"), async (req, res) => {
  try {
    // Get the image file from the req, this is provided by multer.
    const imageFile = req.file;

    // Create a url for the image based on the static route in our app "/images" and the name of the file.
    const imageUrl = "images/" + imageFile.filename;

    // Add the rest of the dish information using req.body and then add the imageUrl to the image.
    const newDishData = {
      ...req.body,
      image: imageUrl,
    };

    // create a new dish
    const newDish = await Dish.create(newDishData);

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
    if (!foundDish) {
      return res.status(400).json({
        message: `Oops, it seems like the dish you're looking for is not there`,
      });
    }

    // check if the dish has an image.
    if (foundDish.value.image) {
      // get the image name without the directory prefix
      const imageName = foundDish.value.image.replace(/^images\//, "");

      // get the static path where the image is stored
      const staticPath = path.join(path.dirname(""), "static/images");

      // join the static path with the image name
      const imagePath = path.join(staticPath, imageName);

      // check if the image exists
      if (fs.existsSync(imagePath)) {
        // delete the image using fs.unlink
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting dish image" });
          }
        });
      }
    }

    return res.status(204).end();
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
    if (!foundDish) {
      return res.status(400).json({
        message: `Oops, it seems like the dish you're looking for is not there`,
      });
    }

    return res.status(200).json({ UpdatedDish: foundDish });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
