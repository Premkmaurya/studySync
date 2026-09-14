const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  profilePicture: {
    type: mongoose.Schema.Types.Mixed,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
