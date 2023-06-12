import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default userProfileSchema;
