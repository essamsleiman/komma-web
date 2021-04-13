const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },

  // createdAt: { type: Date, required: Date.now },
});

const GoogleUser = mongoose.model("GoogleUser", userSchema);

module.exports = GoogleUser;
