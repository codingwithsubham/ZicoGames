const mongoose = require("mongoose");

const UserTradeDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require: true,
    },
    tradeId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    trdType: {
        type: String,
    },
    date: {
        type: Date,
    },
    tradingData: {
        stock: {
            type: String,
        },
        amnt: {
            type: Number,
        }
    }
});

module.exports = UserTradeData = mongoose.model("userTradeData", UserTradeDataSchema);
