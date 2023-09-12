const express = require("express");
const router = express.Router();
const {
    STATUS_CODE_500,
    SERVER_ERROR,
} = require("../../common/constant/constants");
const Wallet = require("../../models/Wallet");
const auth = require("../../middleware/auth");
const { creditToWallet, debitToWallet } = require("../../functions/walletFunctions");


// @route GET api/wallet
// @desc GET WALLET
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.id });
        return res.json(wallet ? wallet : {
            blnc: 0,
            user: req.user.id,
            history: []
        });
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/wallet
// @desc CREDIT WALLET
// @access Private
router.post("/credit", auth, async (req, res) => {
    const { amnt, note } = req.body;
    try {
        const wallet = await creditToWallet(amnt, note, req.user.id);
        return res.json(wallet);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/wallet
// @desc DEBIT WALLET
// @access Private
router.post("/debit", auth, async (req, res) => {
    const { amnt, note } = req.body;
    try {
        const wallet = await debitToWallet(amnt, note, req.user.id);
        return res.json(wallet);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

module.exports = router;