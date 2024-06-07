const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userScheme = new Schema({
  name: String,
  image: String,
});
const userModel = model("users", userScheme);
module.exports = userModel;
