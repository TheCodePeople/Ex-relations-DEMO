const express = require("express");

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
router.delete("/:categoryId", deleteCategory);

// PUT a category
router.put("/:categoryId", updateCategory);

module.exports = router;
