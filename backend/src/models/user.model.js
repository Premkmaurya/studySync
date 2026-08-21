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
  password: {
    type: String,
  },
  publicKey: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
