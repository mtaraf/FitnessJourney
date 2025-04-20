const express = require("express");
const router = express.Router();
const logsController = require("../controllers/logs.controller.js");

// Get Requests
router.get("/:username", logsController.getLog);

// Post Requests
router.post("/", logsController.postLog);

// Delete Requests

// Update Requests
router.put("/:username", logsController.updateLog);

module.exports = router;
