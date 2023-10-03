const UserTradeData = require('../models/UserTradeData');
const { creditToWallet } = require('../functions/walletFunctions');

const distributeWinning = async (data) => {
  const usrTrdData = await UserTradeData.find({
    tradeId: data?.gameUnit?._id,
    'tradingData.stock': data?.res,
    trdType: data?.type,
  });
  if (usrTrdData.length > 0) {
    for (element of usrTrdData) {
      const amnt = parseInt(element?.tradingData?.amnt) * 2;
      await creditToWallet(amnt, 'WC - Winning', element?.user);
    }
  }
};

module.exports = { distributeWinning };
