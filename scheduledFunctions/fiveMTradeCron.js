const CronJob = require("node-cron");
const FiveMTrade = require("../models/FiveMTrade");
const { setResult, createNewTrade, distributeWinning } = require("../zFunctions/fiveMTrade");

exports.init = () => {
  const fiveMTradeCron = CronJob.schedule("*/5 * * * *", async () => {
    try {
      const trads = await FiveMTrade.find();
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

  fiveMTradeCron.start();
};
