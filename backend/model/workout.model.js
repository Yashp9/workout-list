const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: String,
      require: true,
    },
    load: {
      type: Number,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;
