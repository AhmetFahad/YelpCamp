const mongoose = require("mongoose");
const { Schema } = mongoose;

const campGroundSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  price: Number,
  image: String,
  desc: String,
  location: String,
});

module.exports = mongoose.model("campGround", campGroundSchema);
