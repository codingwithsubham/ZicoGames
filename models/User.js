const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  legacyid: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  regsOnSystem: {
    type: String,
    require: true,
  },
  activeOnSystem: {
    type: String,
  },
  status: {
    type: Boolean,
    require: true,
  },
  upline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  refferalIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  upline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bankDetails: {
    bankingName: {
      type: String,
    },
    acNumber: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  otherRoles: [
    {
      type: String,
    }
  ],
  age: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
