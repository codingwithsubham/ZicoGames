const Wallet = require("../models/Wallet");
const { CREDIT, DEBIT } = require("../common/constant/constants");

const creditToWallet = async (amnt, note, user) => {
    const date = new Date();
    try {
        let wallet = await Wallet.findOne({ user: user });
        if (wallet) {
            wallet.blnc = (parseFloat(wallet.blnc) + parseFloat(amnt)).toFixed(2);
            wallet.history.push({
                amnt,
                note,
                date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
                type: CREDIT,
            });
        } else {
            wallet = new Wallet({
                blnc: parseFloat(amnt).toFixed(2),
                user: user,
                history: [{
                    amnt,
                    note,
                    date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
                    type: CREDIT,
                }]
            })
        }
        await wallet.save();
        return wallet;
    } catch (error) {
        throw error;
    }
}

const debitToWallet = async (amnt, note, user) => {
    const date = new Date();
    try {
        let wallet = await Wallet.findOne({ user: user });
        if(!wallet){
            throw error;
        }
        if(parseFloat(wallet.blnc) < parseFloat(amnt)){
            throw error;
        }
        wallet.blnc = (parseFloat(wallet.blnc) - parseFloat(amnt)).toFixed(2);
        wallet.history.push({
            amnt,
            note,
            date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
            type: DEBIT,
        });
        await wallet.save();
        return wallet;
    } catch (error) {
        throw error;
    }
}

module.exports = { creditToWallet, debitToWallet };
