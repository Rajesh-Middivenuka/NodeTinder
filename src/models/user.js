const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    unique: false, // Not typically unique, unless your use case requires it
  },
  lastName: {
    type: String,
    unique: false, // Usually not unique
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // ✅ Make email unique
  },
  password: {
    type: String,
    required: true,
    unique: false, // Passwords should not be unique (many users can have same password)
  },
  age: {
    type: Number,
    unique: false,
  },
  gender: {
    type: String,
    unique: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
