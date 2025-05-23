const UserNutrition = require("../models/userNutrition.model.js");

const getUserNutrition = async (req, res) => {
  try {
    const { username } = req.params;
    const userNutrition = await UserNutrition.findOne({ username: username });
    res.status(200).json(userNutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersNutrition = async (req, res) => {
  try {
    const userNutritions = await UserNutrition.find({});
    res.status(200).json(userNutritions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUserNutrition = async (req, res) => {
  try {
    await UserNutrition.syncIndexes();
    const userNutrition = await UserNutrition.create(req.body);
    res.status(200).json(userNutrition);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      body: req.body,
    });
  }
};

const updateUserNutrition = async (req, res) => {
  try {
    await UserNutrition.syncIndexes();
    const { username } = req.params;
    const userNutrition = await UserNutrition.findOneAndUpdate(
      { username: username },
      req.body
    );

    if (!userNutrition) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(userNutrition);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      body: req.body,
    });
  }
};

module.exports = {
  getUserNutrition,
  getUsersNutrition,
  postUserNutrition,
  updateUserNutrition,
};
