const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const productController = require("../controllers/product.controller.js");

router.get("/", productController.getProducts);

router.post("/", productController.postProducts);

module.exports = router;
