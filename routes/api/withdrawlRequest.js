const express = require("express");
const router = express.Router();
const {
    STATUS_CODE_500,
    SERVER_ERROR,
    PENDING,
    APPROVED,
    STATUS_CODE_400,
} = require("../../common/constant/constants");
const WithdrawlRequest = require("../../models/WithdrawlRequest");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { creditToWallet, debitToWallet } = require("../../functions/walletFunctions");

// @route GET api/withdrawl-request
// @desc GET PENDING REQUEST
// @access Private
router.get("/pending", auth, async (req, res) => {
    try {
        const withdrlData = await WithdrawlRequest.find({ status: PENDING }).sort({date: -1});
        return res.json(withdrlData);
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route GET api/withdrawl-request
// @desc GET REQUEST by user
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const withdrlData = await WithdrawlRequest.find({ user: req.user.id}).sort({date: -1});
        return res.json(withdrlData);
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/withdrawl-request
// @desc APPROVE PENDING REQUEST
// @access Private
router.post("/approve", auth, async (req, res) => {
    const { id } = req.body;
    try {
        const withdrlData = await WithdrawlRequest.findOneAndUpdate(
            { _id: id },
            { $set: { status: APPROVED } }
        );
        return res.json(withdrlData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/withdrawl-request
// @desc DECLINE PENDING REQUEST
// @access Private
router.post("/decline", auth, async (req, res) => {
    const { id } = req.body;
    try {
        const data = await WithdrawlRequest.findById(id);
        await creditToWallet(data?.blnc, "Balance Refunded due to Withdrawl Rejection", data?.user);
        const wthdrlData = await WithdrawlRequest.findOneAndDelete(
            { _id: id }
        );
        return res.json(wthdrlData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/withdrawl-request
// @desc SUBMIT A TOP-UP REQUEST
// @access Private
router.post("/submit", auth, async (req, res) => {
    try {
        const { blnc, bankDetails } = req.body;
        const date = new Date();
        await debitToWallet(blnc, "Withdrawl Requested", req.user.id);
        const withdrawlRequest = new WithdrawlRequest({
            blnc,
            bankDetails,
            status: PENDING,
            date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
            user: req.user.id,
        });
        await withdrawlRequest.save();
        return res.json(withdrawlRequest);
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

module.exports = router;