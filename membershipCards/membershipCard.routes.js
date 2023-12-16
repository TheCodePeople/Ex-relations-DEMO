const express = require("express");
const MembershipCard = require("../models/MembershipCard");
const Customer = require("../models/Customer");
const router = express.Router();

//  GET all membershipCards
router.get("/", async (req, res) => {
  try {
    const membershipCards = await MembershipCard.find();
    return res.status(200).json({ membershipCards }); // Return the Italian membershipCards as JSON
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// GET one membershipCard based on certain condition
router.get("/:membershipCardId", async (req, res) => {
  try {
    // Destruct the id from the url params
    const { membershipCardId } = req.params;

    // Use findById() to get the membershipCard based on given id
    const foundMembershipCard = await MembershipCard.findById(membershipCardId);

    return res.status(200).json(foundMembershipCard);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// POST a membershipCard
router.post("/:restaurantId/:costumerId", async (req, res) => {
  try {
    const customerId = req.params.costumerId;
    const restaurantId = req.params.restaurantId;

    req.body.customer = customerId;
    req.body.restaurant = restaurantId;

    // Create a new membershipCard using the create() method
    const newMembershipCard = await MembershipCard.create(req.body);
    const foundCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        $push: { membershipCard: newMembershipCard },
        membership: true,
      },
      { new: true }
    );
    console.log(
      "🚀 ~ file: membershipCard.routes.js:41 ~ router.post ~ foundCustomer:",
      foundCustomer
    );

    // Send a response with the newly created membershipCard
    res.status(201).json(newMembershipCard);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// DELETE a membershipCard
router.delete("/:membershipCardId", async (req, res) => {
  try {
    const { membershipCardId } = req.params;

    // use the .findByIdAndDelete() method to search for the membershipCard that its id matches the given id and then delete it
    const foundMembershipCard = await MembershipCard.findByIdAndDelete(
      membershipCardId
    );

    // Set a condition to check whether the membershipCard exists or not
    if (!foundMembershipCard)
      return res.status(400).json({
        message: `Oops, it seems like the membershipCard you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

// Create a middleware for updating a membershipCard
router.put("/:membershipCardId", async (req, res) => {
  try {
    const { membershipCardId } = req.params;

    // the changes you wanna make on the membershipCard
    const updatedMembershipCardData = req.body;

    // use the .findByIdAndUpdate() method to search for the membershipCard that its id matches the given id and then update it
    const foundMembershipCard = await MembershipCard.findByIdAndUpdate(
      membershipCardId,
      updatedMembershipCardData,
      {
        new: true,
      }
    );

    // Set a condition to check whether the membershipCard exists or not
    if (!foundMembershipCard)
      return res.status(400).json({
        message: `Oops, it seems like the membershipCard you're looking for is not there`,
      });
    else {
      return res
        .status(200)
        .json({ UpdatedMembershipCard: foundMembershipCard });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});

module.exports = router;
