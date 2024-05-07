const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("./customer.controllers");
const router = express.Router();

//  GET all customers
router.get("/", getAllCustomers);

// GET one customer based on certain condition
router.get("/:customerId", getCustomer);

// POST a customer
router.post("/", createCustomer);

// DELETE a customer
router.delete("/:customerId", deleteCustomer);

// PUT (update) a customer
router.put("/:customerId", updateCustomer);

module.exports = router;
