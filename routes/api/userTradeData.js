const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
    SERVER_ERROR,
    STATUS_CODE_500,
    FIVE_M,
    COLOR,
    FLIGHT
} = require("../../common/constant/constants");
const UserTradeData = require("../../models/UserTradeData");
const FiveMTrade = require("../../models/FiveMTrade");
const ColorTrade = require("../../models/ColorTrade");
const FlightTrade = require("../../models/FlightTrade");
const { debitToWallet } = require("../../functions/walletFunctions");

// @route GET api/user-trade/ 
// @desc Get all trade by user
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const trdData = await UserTradeData.find({ user: req.user.id });
        return res.json(trdData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route GET api/user-trade/all
// @desc Get all trade
// @access Private
router.get("/all", auth, async (req, res) => {
    try {
        const trdData = await UserTradeData.find({}).populate("user");
        return res.json(trdData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route GET api/user-trade/current-user/:id
// @desc Get trade by id by current user
// @access Private
router.get("/current-user/:id", auth, async (req, res) => {
    try {
        const trdData = await UserTradeData.find({ tradeId: req.params.id, user: req.user.id });
        return res.json(trdData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route GET api/user-trade/:id
// @desc Get trade by id
// @access Private
router.get("/:id", auth, async (req, res) => {
    try {
        const trdData = await UserTradeData.find({ tradeId: req.params.id });
        return res.json(trdData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route GET api/user-trade/ 
// @desc Get latest trade
// @access Private
router.post("/set", auth, async (req, res) => {
    const { stock, amnt, tradeId, trdType } = req.body;
    let tradeData = {};
    const date = new Date();
    let note = "";
    if (trdType === FIVE_M) {
        note = "Debit on 1,2 Ka 9";
    } else if (trdType === COLOR) {
        note = "Debit on Rang-bazi";
    } else if (trdType === FLIGHT) {
        note = "Debit on Patang-bazi";
    }
    try {
        await debitToWallet(amnt, note, req.user.id);
        if (trdType === FIVE_M) {
            tradeData = await FiveMTrade.findById(tradeId);
            tradeData.stocks[stock] = parseInt(tradeData.stocks[stock]) + parseInt(amnt);
        } else if (trdType === COLOR) {
            tradeData = await ColorTrade.findById(tradeId);
            tradeData.stocks[stock] = parseInt(tradeData.stocks[stock]) + parseInt(amnt);
        } else if (trdType === FLIGHT) {
            tradeData = await FlightTrade.findById(tradeId);
            tradeData.stocks[stock] = parseInt(tradeData.stocks[stock]) + parseInt(amnt);
        }
        const userTrdData = new UserTradeData({
            user: req.user.id,
            tradeId,
            trdType,
            date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
            tradingData: { stock, amnt }
        });
        await userTrdData.save();
        await tradeData.save();
        return res.json(userTrdData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

module.exports = router;
