const Users = require("../models/users.model.js");

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Users.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    await Users.syncIndexes();
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      body: req.body,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.syncIndexes();
    const { username } = req.params;
    const user = await Users.findOneAndUpdate({ username: username }, req.body);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      body: req.body,
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  postUser,
  updateUser,
};
