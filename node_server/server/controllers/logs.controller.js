const Logs = require("../models/logs.model.js");

const getLog = async (req, res) => {
  try {
    const { username } = req.params;
    const log = await Logs.findOne({ username: username });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postLog = async (req, res) => {
  try {
    await Logs.syncIndexes();
    const log = await Logs.create(req.body);
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message + req.body });
  }
};

const updateLog = async (req, res) => {
  try {
    await Logs.syncIndexes();
    const { username } = req.params;
    console.log(req.body);
    const log = await Logs.findOneAndUpdate({ username: username }, req.body);

    if (!log) {
      return res.status(404).json({ message: "Log Not Found" });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message + req.body });
  }
};

module.exports = {
  getLog,
  postLog,
  updateLog,
};
