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

    information: {
      current_weight: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },

    goals: {
      calorie_goal: {
        type: Number,
      },
      protein_goal: {
        type: Number,
      },
      weight_goal: {
        type: Number,
      },
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

    weeklyPlan: {
      type: [
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
      default: [
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
        {
          title: "",
          exercises: [],
        },
      ],
    },
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
