const mongoose = require("mongoose");

const WCTradeSchema = new mongoose.Schema({
    gameName: {
        type: String,
    },
    date: {
        type: Date,
    },
    gameDesc: {
        type: String,
    },
    started: {
        type: Boolean,
    },
    completed: {
        type: Boolean,
    }
});

module.exports = WCTrade = mongoose.model("wcTrade", WCTradeSchema);
