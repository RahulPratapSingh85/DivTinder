const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: Number,
  },
  age: {
    type: String,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
