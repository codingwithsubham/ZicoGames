const mongoose = require("mongoose");

const WithdrawlRequestSchema = new mongoose.Schema({
  blnc: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bankDetails: {
    type: Object
  },
  status: {
    type: String,
    require: true,
  },
  date:{
    type: String,
    require: true,
  },
});

module.exports = WithdrawlRequest = mongoose.model("withdrawlRequest", WithdrawlRequestSchema);
