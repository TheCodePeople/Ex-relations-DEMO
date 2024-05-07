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
    // Destruct the id from the url params
    const { restaurantId } = req.params;

    // Use findById() to get the restaurant based on given id
    const foundRestaurant = await Restaurant.findById(restaurantId);

    return res.status(200).json({ foundRestaurant });
  } catch (error) {
    next(error);
  }
};
const createRestaurant = async (req, res, next) => {
  try {
    // Create a new restaurant using the create() method
    const newRestaurant = await Restaurant.create(req.body);

    // Send a response with the newly created restaurant
    res.status(201).json({ newRestaurant });
  } catch (error) {
    next(error);
  }
};
const deleteRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    // use the .findByIdAndDelete() method to search for the restaurant that its id matches the given id and then delete it
    const foundRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    // Set a condition to check whether the restaurant exists or not
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

    // the changes you wanna make on the restaurant
    const updatedRestaurantData = req.body;

    // use the .findByIdAndUpdate() method to search for the restaurant that its id matches the given id and then update it
    const foundRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedRestaurantData,
      {
        new: true,
      }
    );

    // Set a condition to check whether the restaurant exists or not
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
