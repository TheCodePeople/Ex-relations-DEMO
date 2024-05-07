const MembershipCard = require("../models/MembershipCard");

const getAllMembershipCards = async (req, res) => {
  try {
    const membershipCards = await MembershipCard.find().populate([
      "customer",
      "restaurant",
    ]);
    return res.status(200).json({ membershipCards });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const getMembershipCard = async (req, res) => {
  try {
    // Destruct the id from the url params
    const { membershipCardId } = req.params;

    // Use findById() to get the membershipCard based on given id

    const foundMembershipCard = await MembershipCard.findById(membershipCardId);

    return res.status(200).json(foundMembershipCard);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const createMembershipCard = async (req, res) => {
  try {
    // Create a new membershipCard using the create() method
    const newMembershipCard = await MembershipCard.create(req.body);

    // Send a response with the newly created membershipCard
    res.status(201).json(newMembershipCard);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
const deleteMembershipCard = async (req, res) => {
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
};
const updateMembershipCard = async (req, res) => {
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
};

module.exports = {
  getAllMembershipCards,
  getMembershipCard,
  createMembershipCard,
  deleteMembershipCard,
  updateMembershipCard,
};