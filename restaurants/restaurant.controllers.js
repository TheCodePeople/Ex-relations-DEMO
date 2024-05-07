const Restaurant = require("../models/Restaurant");

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ restaurants }); // Return the Italian restaurants as JSON
  } catch (error) {
    next(error);
  }
};
const getRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const foundRestaurant = await Restaurant.findById(restaurantId);

    return res.status(200).json({ foundRestaurant });
  } catch (error) {
    next(error);
  }
};
const createRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json({ newRestaurant });
  } catch (error) {
    next(error);
  }
};
const deleteRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const foundRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!foundRestaurant)
      return res.status(400).json({
        message: `Oops, it seems like the restaurant you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
const updateRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const updatedRestaurantData = req.body;

    const foundRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedRestaurantData,
      {
        new: true,
      }
    );

    if (!foundRestaurant)
      return res.status(400).json({
        message: `Oops, it seems like the restaurant you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedRestaurant: foundRestaurant });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
