const CronJob = require("node-cron");
const FlightTrade = require("../models/FlightTrade");
const { setResult, createNewTrade, distributeWinning } = require("../zFunctions/flightTrade");

exports.init = () => {
  const flightTradeCron = CronJob.schedule("*/2 * * * *", async () => {
    try {
      const trads = await FlightTrade.find();
      if (trads.length > 0) {
        await setResult(trads[trads.length - 1]);
      }
      await createNewTrade(trads);
      await distributeWinning(trads[trads.length - 1])
    } catch (error) {
      console.log(error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  flightTradeCron.start();
};
