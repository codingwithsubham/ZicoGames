const mongoose = require("mongoose");
const { LOWER } = require("../common/constant/constants");

const ColorTradeSchema = new mongoose.Schema({
    startTime: {
        type: String,
    },
    totalTrade: {
        type: Number,
        default: 0,
    },
    result: {
        type: String,
    },
    returnLogic: {
        type: String,
        default: LOWER,
    },
    stocks: {
        red: {
            type: Number
        },
        yellow: {
            type: Number
        },
        green: {
            type: Number
        },
    }
});

module.exports = ColorTrade = mongoose.model("colorTrade", ColorTradeSchema);
