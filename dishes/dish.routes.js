const express = require("express");
const {
  getAllDishes,
  getDishesByCategories,
  getDish,
  createDish,
  deleteDish,
  updateDish,
} = require("./dish.controllers");
const router = express.Router();

//TODO: Create a route to find dishes based on their categories

//  GET all dishes
router.get("/", getAllDishes);

router.post("/category", getDishesByCategories);

// GET one dish based on dish id
router.get("/:dishId", getDish);

// POST a dish
router.post("/", createDish);

// DELETE a dish
router.delete("/:dishId", deleteDish);

// Update (PUT) a dish
router.put("/:dishId", updateDish);

module.exports = router;
