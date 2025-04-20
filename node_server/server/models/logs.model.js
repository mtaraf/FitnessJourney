const mongoose = require("mongoose");

const LogsSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },
    log: [
      {
        date: {
          type: String,
          required: [true, "Please enter a date"],
          unique: true,
        },
        breakfast: {
          meals: [],
          foods: [],
        },
        lunch: {
          meals: [],
          foods: [],
        },
        dinner: {
          meals: [],
          foods: [],
        },
        everythingElse: {
          meals: [],
          foods: [],
        },
      },
    ],
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
