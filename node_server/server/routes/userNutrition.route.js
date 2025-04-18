const express = require("express");
const router = express.Router();
const userNutritionController = require("../controllers/userNutrition.controller.js");

// Get Requests
router.get("/:username", userNutritionController.getUserNutrition);
router.get("/", userNutritionController.getUsersNutrition);

// Post Requests
router.post("/", userNutritionController.postUserNutrition);

// Delete Requests

// Update Requests
router.put("/:username", userNutritionController.updateUserNutrition);

module.exports = router;
