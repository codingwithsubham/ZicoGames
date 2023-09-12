const mongoose = require("mongoose");

const TopUpRequestSchema = new mongoose.Schema({
  blnc: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  utr: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  date:{
    type: String,
    require: true,
  },
  userData: {
    type: Object,
  },
});

module.exports = TopUpRequest = mongoose.model("topUpRequest", TopUpRequestSchema);
