const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    code: {
      type: String,
      default: null,
    },
    profilePicture: {},
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
