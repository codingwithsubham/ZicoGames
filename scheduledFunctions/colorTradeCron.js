const CronJob = require("node-cron");
const ColorTrade = require("../models/ColorTrade");
const { setResult, createNewTrade, distributeWinning } = require("../zFunctions/colorTrade");

exports.init = () => {
  const colorTradeCron = CronJob.schedule("*/1 * * * *", async () => {
    try {
      const trads = await ColorTrade.find();
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

  colorTradeCron.start();
};
