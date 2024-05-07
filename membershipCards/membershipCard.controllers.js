const MembershipCard = require("../models/MembershipCard");

const getAllMembershipCards = async (req, res, next) => {
  try {
    const membershipCards = await MembershipCard.find().populate([
      "customer",
      "restaurant",
    ]);
    return res.status(200).json({ membershipCards });
  } catch (error) {
    next(error);
  }
};

const getMembershipCard = async (req, res, next) => {
  try {
    const { membershipCardId } = req.params;

    const foundMembershipCard = await MembershipCard.findById(membershipCardId);

    return res.status(200).json({ foundMembershipCard });
  } catch (error) {
    next(error);
  }
};

const createMembershipCard = async (req, res, next) => {
  try {
    const newMembershipCard = await MembershipCard.create(req.body);

    res.status(201).json({ newMembershipCard });
  } catch (error) {
    next(error);
  }
};

const deleteMembershipCard = async (req, res, next) => {
  try {
    const { membershipCardId } = req.params;

    const foundMembershipCard = await MembershipCard.findByIdAndDelete(
      membershipCardId
    );

    if (!foundMembershipCard)
      return res.status(400).json({
        message: `Oops, it seems like the membershipCard you're looking for is not there`,
      });
    else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};

const updateMembershipCard = async (req, res, next) => {
  try {
    const { membershipCardId } = req.params;

    const updatedMembershipCardData = req.body;

    const foundMembershipCard = await MembershipCard.findByIdAndUpdate(
      membershipCardId,
      updatedMembershipCardData,
      {
        new: true,
      }
    );

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
    next(error);
  }
};

module.exports = {
  getAllMembershipCards,
  getMembershipCard,
  createMembershipCard,
  deleteMembershipCard,
  updateMembershipCard,
};
