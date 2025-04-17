const mongoose = require("mongoose");

const UserNutritionSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },

    meals: [
      {
        title: {
          type: String,
        },
        ingredients: [
          {
            name: {
              type: String,
            },
            calories: {
              type: Number,
            },
            protein: {
              type: Number,
            },
          },
        ],
        totalCalories: {
          type: Number,
        },
        totalProtein: {
          type: Number,
        },
      },
    ],

    foods: [
      {
        name: {
          type: String,
        },
        calories: {
          type: Number,
        },
        protein: {
          type: Number,
        },
      },
    ],

    favorites: [
      {
        name: {
          type: String,
        },
        calories: {
          type: Number,
        },
        protein: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const UserNutrition = mongoose.model("UserNutrition", UserNutritionSchema);

module.exports = UserNutrition;
