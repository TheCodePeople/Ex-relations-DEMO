const Customer = require("../models/Customer");

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ customers });
  } catch (error) {
    next(error);
  }
};
const getCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const foundCustomer = await Customer.findById(customerId);
    return res.status(200).json({ foundCustomer });
  } catch (error) {
    next(error);
  }
};
const createCustomer = async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ newCustomer });
  } catch (error) {
    next(error);
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const foundCustomer = await Customer.findByIdAndDelete(customerId);
    if (!foundCustomer)
      return res.status(400).json({
        message: `Oops, it seems like the customer you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
const updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const updatedCustomerData = req.body;

    const foundCustomer = await Customer.findByIdAndUpdate(
      customerId,
      updatedCustomerData,
      {
        new: true,
      }
    );

    if (!foundCustomer)
      return res.status(400).json({
        message: `Oops, it seems like the customer you're looking for is not there`,
      });
    else {
      return res.status(200).json({ UpdatedCustomer: foundCustomer });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
