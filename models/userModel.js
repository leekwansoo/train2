const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  trainitem: {
    type: Array,
    required: false,
  },

});

const User = mongoose.model("User", userSchema);
module.exports = User;