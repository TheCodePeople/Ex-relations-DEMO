const express = require("express");
const connectDB = require("./database");
const Dish = require("./models/Dish");
const italianDishesRoutes = require("./dishes/italianDishes.routes");
const customerRoutes = require("./customers/customer.routes");
const categoryRoutes = require("./categories/category.routes");
const membershipCardRoutes = require("./membershipCards/membershipCard.routes");
const restaurantRoutes = require("./restaurants/restaurants.routes");
const app = express();
const PORT = 8000; // Choose a port of your choice

connectDB();

app.use(express.json());

//  Italian dishes routes
app.use("/italianDishes", italianDishesRoutes);

//  Customers routes
app.use("/customers", customerRoutes);

//  Categories routes
app.use("/categories", categoryRoutes);

//  MembershipCards routes
app.use("/membershipCards", membershipCardRoutes);

//  Restaurants routes
app.use("/restaurants", restaurantRoutes);

// Global 404 Middleware: This should be placed at the end of your middleware and route definitions.
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
