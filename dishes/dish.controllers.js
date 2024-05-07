const Dish = require("../models/Dish");

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
      .populate("categories", "name")
      .populate("restaurant", "name");
    return res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const getDishesByCategories = async (req, res) => {
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
};

const getDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    const foundDish = await Dish.findById(dishId).populate([
      "categories",
      "restaurant",
    ]);

    return res.status(200).json({ foundDish });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const createDish = async (req, res) => {
  try {
    const newDish = await Dish.create(req.body);

    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    const foundDish = await Dish.findByIdAndDelete(dishId);

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
};

const updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    const updatedDishData = req.body;

    const foundDish = await Dish.findByIdAndUpdate(dishId, updatedDishData, {
      new: true,
    });

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
};
module.exports = {
  getAllDishes,
  getDishesByCategories,
  getDish,
  createDish,
  deleteDish,
  updateDish,
};
