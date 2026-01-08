const mongoose = require("mongoose");
const {Schema}=mongoose;
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
  },
  password: {
    type: Number,
    required:true,
  },
  age: {
    type: String,
  },
  photurl:{
    type:String,
  },
  about:{
    type:String,
    default:"This is a default about of the user"
  },
  skills:{
    type:[String],
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
