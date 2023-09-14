const mongoose = require("mongoose");
const { LOWER } = require("../common/constant/constants");

const FlightTradeSchema = new mongoose.Schema({
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
    }
});

module.exports = FlightTrade = mongoose.model("flightTrade", FlightTradeSchema);
