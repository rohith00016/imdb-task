const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  name: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: true},
  profilePic: { type: String},
});

module.exports = mongoose.model("Actor", ActorSchema);
