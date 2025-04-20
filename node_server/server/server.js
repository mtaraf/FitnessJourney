const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.route.js");
const userNutritionRouter = require("./routes/userNutrition.route.js");
const logRouter = require("./routes/logs.route.js");

// middle-ware
app.use(express.json());
app.use(function (req, res, next) {
  express.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// routes

app.use("/api/users", usersRouter);
app.use("/api/userNutrition", userNutritionRouter);
app.use("/api/logs", logRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@dev.hmlkvje.mongodb.net/?retryWrites=true&w=majority&appName=dev"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000, () => console.log("Listening on port 5000"));
  })
  .catch(() => console.log("Connection Failed"));
