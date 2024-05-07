const express = require("express");
const {
  getAllMembershipCards,
  getMembershipCard,
  createMembershipCard,
  deleteMembershipCard,
  updateMembershipCard,
} = require("./memebershipCard.controllers");
const router = express.Router();

//  GET all membershipCards
router.get("/", getAllMembershipCards);

// GET one membershipCard based on certain condition
router.get("/:membershipCardId", getMembershipCard);

// POST a membershipCard
router.post("/", createMembershipCard);

// DELETE a membershipCard
router.delete("/:membershipCardId", deleteMembershipCard);

// Create a middleware for updating a membershipCard
router.put("/:membershipCardId", updateMembershipCard);

module.exports = router;
