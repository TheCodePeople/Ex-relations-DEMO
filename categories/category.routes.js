const express = require("express");
const Category = require("../models/Category");
const Dish = require("../models/Dish");
const router = express.Router();

const {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("./category.controllers");

//  GET all categories
router.get("/", getAllCategories);

// GET single category
router.get("/:categoryId", getCategory);

// POST a category
router.post("/", createCategory);

// DELETE a category
router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // use the .findByIdAndDelete() method to search for the category that its id matches the given id and then delete it
    const foundCategory = await Category.findByIdAndDelete(categoryId);

    if (!foundCategory) {
      return res.status(400).json({
        message: `Oops, it seems like the category you're looking for is not there`,
      });
    }

    // Delete the category from the dishes if it is used in one of them.
    await Dish.updateMany(
      {
        categories: categoryId,
      },
      {
        $pull: {
          // use pull to remove an item from the categories array based on their id.
          categories: categoryId,
        },
      }
    );

    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// PUT a category
router.put("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // the changes you wanna make on the category
    const updatedCategoryData = req.body;

    // use the .findByIdAndUpdate() method to search for the category that its id matches the given id and then update it
    const foundCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategoryData,
      {
        new: true,
      }
    );

    if (!foundCategory) {
      return res.status(400).json({
        message: `Oops, it seems like the category you're looking for is not there`,
      });
    }

    return res.status(200).json({ UpdatedCategory: foundCategory });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
