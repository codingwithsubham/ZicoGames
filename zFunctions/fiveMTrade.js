const { LOWER, RUNNUNG } = require("../common/constant/constants");
const { fiveMTradeDefault } = require("../common/constant/defaultData");
const FiveMTrade = require("../models/FiveMTrade");
const UserTradeData = require("../models/UserTradeData");
const { creditToWallet } = require("../functions/walletFunctions");


const distributeWinning = async (trdData) => {
    const usrTrdData = await UserTradeData.find({ tradeId: trdData?._id, 'tradingData.stock': trdData?.result });
    if (usrTrdData.length > 0) {
        for (element of usrTrdData) {
            const amnt = parseInt(element?.tradingData?.amnt) * 9;
            await creditToWallet(amnt, "1,2 ka 9 Winning", element?.user)
        }
    }
}

const createNewTrade = async (trads) => {
    const date = new Date();
    if (trads.length >= 20) {
        const x = trads[0];
        await x.remove();
    }
    const new_trade = new FiveMTrade({
        ...fiveMTradeDefault,
        startTime: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    });
    await new_trade.save();
}

const setResult = async (trdData) => {
    let data = trdData;
    if (data?.result === RUNNUNG) {
        if (data.returnLogic === LOWER) {
            const result = getResult(trdData);
            data.result = result;
            await data.save();
        }
    }
}

const getResult = (data) => {
    let values = Object.values(data.stocks);
    values = values.filter(x => x !== true && x !== false);
    let res = Math.min(...values);
    if(res <= 0){
        const d = new Date();
        let time = d.getMinutes();
        let hour = d.getHours();
        if((time + hour) % 5 === 0){
            values = values.filter((i) => i !== res);
            if (values.length > 0) {
                res = Math.min(...values);
            }
        } 
    }
    let minDatas = [];
    for (const property in data.stocks) {
        if (data.stocks[property] === res) {
            minDatas.push(property);
        }
    }
    const random_index = Math.floor(Math.random() * minDatas.length);
    const finalRes = minDatas[random_index];
    return finalRes;
};

module.exports = { setResult, createNewTrade, distributeWinning };