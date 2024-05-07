const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const getCategory = async (req, res) => {
  try {
    // Destruct the id from the url params
    const { categoryId } = req.params;

    // Use findById() to get the category based on given id
    const foundCategory = await Category.findById(categoryId);

    return res.status(200).json(foundCategory);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const createCategory = async (req, res) => {
  try {
    // Create a new category using the create() method
    const newCategory = await Category.create(req.body);

    // Send a response with the newly created category
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // use the .findByIdAndDelete() method to search for the category that its id matches the given id and then delete it
    const foundCategory = await Category.findByIdAndDelete(categoryId);

    // Set a condition to check whether the category exists or not
    if (!foundCategory)
      return res.status(400).json({
        message: `Oops, it seems like the category you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const updateCategory = async (req, res) => {
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

    // Set a condition to check whether the category exists or not
    if (!foundCategory)
      return res.status(400).json({
        message: `Oops, it seems like the category you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedCategory: foundCategory });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
