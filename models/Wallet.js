const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  blnc: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  history: [
    {
      amnt: {
        type: String,
      },
      note: {
        type: String,
      },
      date: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  ],
});

module.exports = Wallet = mongoose.model("wallet", WalletSchema);
