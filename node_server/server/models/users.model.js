const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
    },

    workouts: [
      {
        title: {
          type: String,
        },
        exercises: [
          {
            name: {
              type: String,
            },
            sets: {
              type: String,
            },
            reps: {
              type: String,
            },
            weight: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
