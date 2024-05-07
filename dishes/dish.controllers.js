const Dish = require("../models/Dish");

const getAllDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find()
      .populate("categories", "name")
      .populate("restaurant", "name");
    return res.status(200).json({ dishes });
  } catch (error) {
    next(error);
  }
};

const getDishesByCategories = async (req, res, next) => {
  // POST method to find dishes based on their categories
  // NOTE: This is a POST method because we need to provide an array of categories in order to get data.

  try {
    const { categoryIds } = req.body;
    const dishes = await Dish.find()
      .where("categories")
      .all(categoryIds)
      .populate(["categories", "restaurant"]);

    return res.status(200).json({ dishes });
  } catch (error) {
    next(error);
  }
};

const getDish = async (req, res, next) => {
  try {
    const { dishId } = req.params;

    const foundDish = await Dish.findById(dishId).populate([
      "categories",
      "restaurant",
    ]);

    return res.status(200).json({ foundDish });
  } catch (error) {
    next(error);
  }
};

const createDish = async (req, res, next) => {
  try {
    const newDish = await Dish.create(req.body);

    res.status(201).json(newDish);
  } catch (error) {
    next(error);
  }
};

const deleteDish = async (req, res, next) => {
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
    next(error);
  }
};

const updateDish = async (req, res, next) => {
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
    next(error);
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
