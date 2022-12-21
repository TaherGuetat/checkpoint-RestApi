const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  age: Number,
  adress: String,
});
const User= mongoose.model("user", userSchema);
module.exports =User
