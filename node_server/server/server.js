const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const router = require("./routes/product.route.js");

// middle-ware
app.use(express.json());
app.use(function (req, res, next) {
  express.json();

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

// routes
app.use("/api/products", router);

// app.get("/", (req, res) => {
//   res.json({ username: "default" });
// });

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const products = await Product.findById(id);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://marcostaraf:NSteHhpnHxUcJvzF@fitness-app-backend-db.d6ovmqy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=fitness-app-backend-db"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000, () => console.log("Listening on port 5000"));
  })
  .catch(() => console.log("Connection Failed"));
