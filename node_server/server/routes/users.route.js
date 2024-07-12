const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller.js");

// Get Requests
router.get("/:username", usersController.getUser);
router.get("/", usersController.getUsers);

// Post Requests
router.post("/", usersController.postUser);

// Delete Requests

// Update Requests
router.put("/:username", usersController.updateUser);

module.exports = router;
