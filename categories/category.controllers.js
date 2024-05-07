const Category = require("../models/Category");
const Dish = require("../models/Dish");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};
const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const foundCategory = await Category.findById(categoryId);

    return res.status(200).json({ foundCategory });
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

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
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
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
    next(error);
  }
};
module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
