const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  clientID: {
    type: String,
  },
  clientSecret: {
    type: Number,
  },
  ownerName:{
    type: Number,
  },
  ownerEmail: {
    type: String,
  },
  rollNo: {
    type: String,
  },
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("clientSecret")) {
    next();
  }

  this.password = await bcrypt.hash(this.clientSecret, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {});
};

userSchema.methods.comparePassword = async function (clientSecret) {
  return await bcrypt.compare(clientSecret, this.clientSecret);
};


module.exports = mongoose.model("User", userSchema);
