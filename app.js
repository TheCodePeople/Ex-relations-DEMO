const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const connectDB = require("./database");
const errorHandling = require("./middlewares/errorHandling");

// Routes
const dishRoutes = require("./dishes/dishes.routes");
const reviewRoutes = require("./reviews/reviews.routes");
const customerRoutes = require("./customers/customer.routes");
const categoryRoutes = require("./categories/category.routes");
const membershipCardRoutes = require("./membershipCards/membershipCard.routes");
const restaurantRoutes = require("./restaurants/restaurants.routes");
const notFoundError = require("./middlewares/notFoundError");

const app = express();
const PORT = 8000; // Choose a port of your choice

// Get the path of the static directory where you save the images in your project
const staticPath = path.join(path.dirname(""), "static/images");

connectDB();

app.use(express.json());

// dishes routes
app.use("/dishes", dishRoutes);

//  Customers routes
app.use("/customers", customerRoutes);

//  Categories routes
app.use("/categories", categoryRoutes);

//  MembershipCards routes
app.use("/membershipCards", membershipCardRoutes);

//  Restaurants routes
app.use("/restaurants", restaurantRoutes);

// reviews routes
app.use("/reviews", reviewRoutes);

// images route is used with express.static middleware to create a static route to serve your saved images to the client.
app.use("/images", express.static(staticPath));

// Global 404 Middleware: This should be placed at the end of your middleware and route definitions.
app.use("*", notFoundError);

app.use(errorHandling);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
