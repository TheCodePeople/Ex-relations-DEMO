const express = require("express");
// Dummy data for Italian restaurant dishes
const italianDishes = require("./italianDishes");
const connectDB = require("./database");
// Create an app by calling express()
const app = express();
connectDB();

// Parsing the request.body into json format
app.use(express.json());

// Define a route for all /dishes
app.get("/dishes", (req, res) => {
  res.json(italianDishes); // Return the Italian dishes as JSON
});

// Define a route for one /dishes
app.get("/dishes/:id", (req, res) => {
  const { id } = req.params;
  const foundDish = italianDishes.find((dish) => dish.id === Number(id));
  res.json(foundDish); // Return the Italian dishes as JSON
});

// Create a middleware for posting a dish
const postDishMiddleware = (req, res, next) => {
  const dishName = req.body.name; // Assuming JSON request body
  if (dishName !== "name") {
    next(); // Allow the request to proceed
  } else {
    res.status(400).send("Invalid dish name. 'name' is not allowed.");
  }
};

// Create a middleware for creating a dish
app.post("/dishes", postDishMiddleware, (req, res) => {
  const newDishData = req.body;
  const newDish = {
    id: italianDishes[italianDishes.length - 1].id + 1,
    name: newDishData.name,
    description: newDishData.description,
    image: newDishData.image,
    price: newDishData.price,
  };
  // Add the new dish to your menu (e.g., an array of dishes)
  // Send a response with the newly created dish
  res.json(newDish);
});

// Create a middleware for deleting a dish
app.delete("/dishes/:id", (req, res) => {
  const dishId = req.params.id;
  const dishIndex = italianDishes.findIndex((dish) => dish.id === +dishId);
  if (dishIndex !== -1) {
    italianDishes.splice(dishIndex, 1);
    res.status(204).end(); // Respond with a 204 No Content status code
  } else {
    res.status(404).json({ error: "Dish not found" }); // Respond with a 404 Not Found status code and an error message
  }
});

// Create a middleware for updating a dish
app.put("/dishes/:id", (req, res) => {
  const dishId = req.params.id;
  const updatedDishData = req.body;
  // Implement the code to update the dish in the array
  const index = italianDishes.findIndex((dish) => dish.id === Number(dishId));
  if (index !== -1) {
    // Update the dish with the new data
    italianDishes[index] = { ...italianDishes[index], ...updatedDishData };
    res.json(italianDishes[index]); // Respond with the updated dish
  } else {
    res.status(404).json({ error: "Dish not found" }); // Respond with a 404 Not Found status code and an error message
  }
});

// Global 404 Middleware: This should be placed at the end of your middleware and route definitions.
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Start the Express server
const port = 8000; // Choose a port of your choice
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
