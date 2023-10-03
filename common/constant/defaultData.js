const { LOWER, RUNNUNG } = require("./constants");

module.exports = {
    fiveMTradeDefault: {
        totalTrade: 0,
        result: RUNNUNG,
        returnLogic: LOWER,
        stocks: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        }
    },
    colorTradeDefault: {
        totalTrade: 0,
        result: RUNNUNG,
        returnLogic: LOWER,
        stocks: {
            red: 0,
            yellow: 0,
            green: 0
        }
    },
    flightTradeDefault: {
        totalTrade: 0,
        result: RUNNUNG,
        returnLogic: LOWER,
        stocks: {
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        }
    },
    wcDefaultData: {
        over: 0,
        evenOdd: {
            isRunning: true,
            result: RUNNUNG
        },
        wicketorNo: {
            isRunning: true,
            result: RUNNUNG
        },
        fourRuns: {
            isRunning: true,
            result: RUNNUNG
        },
        sixRuns: {
            isRunning: true,
            result: RUNNUNG
        },
    }
}