const mongoose = require("mongoose");
const Crypto = require("crypto");
const JWT = require("jsonwebtoken");

const Schema = mongoose.Schema;
const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: String,
  username: String,
});

User.pre("save", function (next) {
  if (this.password && this.password.length >= 6) {
    this.password = this.hashPassword(this.password);
  }
  next();
});

User.methods.hashPassword = (password) => {
  return Crypto.createHmac("sha256", "salt").update(password).digest("hex");
};

User.methods.IsAuthenticate = function (password) {
  return this.password === this.hashPassword(password);
};

User.methods.SignToken = (email, userid) => {
  let token = JWT.sign({ email, userid }, "TOPSCERET", {
    expiresIn: "1h",
  });
  return token;
};

User.methods.CheckAuthToken = () => {};

module.exports = mongoose.model("User", User);
