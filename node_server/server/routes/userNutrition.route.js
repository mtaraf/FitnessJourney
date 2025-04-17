const express = require("express");
const router = express.Router();
const userNutritionController = require("../controllers/userNutrition.controller.js");

// Get Requests
router.get("/:username", userNutritionController.getUser);
router.get("/", userNutritionController.getUsers);

// Post Requests
router.post("/", userNutritionController.postUser);

// Delete Requests

// Update Requests
router.put("/:username", userNutritionController.updateUser);

module.exports = router;
