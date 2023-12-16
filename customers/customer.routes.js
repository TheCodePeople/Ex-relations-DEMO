const express = require("express");
const Customer = require("../models/Customer");
const MembershipCard = require("../models/MembershipCard");
const router = express.Router();

//  GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ customers }); // Return the Italian customers as JSON
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one customer based on certain condition
router.get("/:customerId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { customerId } = req.params;

    // Use findById() to get the customer based on given id
    const foundCustomer = await Customer.findById(customerId);

    return res.status(200).json(foundCustomer);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a customer
router.post("/", async (req, res) => {
  try {
    // Create a new customer using the create() method
    const newCustomer = await Customer.create(req.body);

    // Send a response with the newly created customer
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a customer
router.delete("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    // use the .findByIdAndDelete() method to search for the customer that its id matches the given id and then delete it
    const foundCustomer = await Customer.findByIdAndDelete(customerId);

    // Set a condition to check whether the customer exists or not
    if (!foundCustomer)
      return res.status(400).json({
        message: `Oops, it seems like the customer you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// Create a middleware for updating a customer
router.put("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    // the changes you wanna make on the customer
    const updatedCustomerData = req.body;

    // use the .findByIdAndUpdate() method to search for the customer that its id matches the given id and then update it
    const foundCustomer = await Customer.findByIdAndUpdate(
      customerId,
      updatedCustomerData,
      {
        new: true,
      }
    );

    // Set a condition to check whether the customer exists or not
    if (!foundCustomer)
      return res.status(400).json({
        message: `Oops, it seems like the customer you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedCustomer: foundCustomer });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
