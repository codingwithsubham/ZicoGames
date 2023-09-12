const mongoose = require("mongoose");
const { LOWER } = require("../common/constant/constants");

const FiveMTradeSchema = new mongoose.Schema({
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
        0: {
            type: Number
        },
        1: {
            type: Number
        },
        2: {
            type: Number
        },
        3: {
            type: Number
        },
        4: {
            type: Number
        },
        5: {
            type: Number
        },
        6: {
            type: Number
        },
        7: {
            type: Number
        },
        8: {
            type: Number
        },
        9: {
            type: Number
        }
    }
});

module.exports = FiveMTrade = mongoose.model("fiveMTrade", FiveMTradeSchema);
