const express = require("express");
const router = express.Router();
const {
    STATUS_CODE_500,
    SERVER_ERROR,
    STATUS_CODE_400,
    SUCCESS,
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

// @route GET api/wallet
// @desc DEBIT WALLET
// @access Private
router.get("/tot-wlt-blnc", auth, async (req, res) => {
    try {
        const wallets = await Wallet.find({});
        let waltBlnc = 0;
        wallets.map( itm => (
            waltBlnc = waltBlnc + parseFloat(itm?.blnc)
        ))
        return res.json(waltBlnc);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/wallet
// @desc DEBIT FROM WALLET
// @access Private
router.post("/transfer", auth, async (req, res) => {
    const {amnt, user} = req.body;
    try {
        let wallet = await Wallet.findOne({ user: req.user.id });
        if(!wallet){
          return res.status(STATUS_CODE_400).send(BAD_REQUEST);
        }
        if(wallet?.blnc <= 0){
          return res.status(STATUS_CODE_400).send(BAD_REQUEST);
        }
        if(parseFloat(amnt) > parseFloat(wallet?.blnc)){
          return res.status(STATUS_CODE_400).send(BAD_REQUEST);
        }
        await debitToWallet(amnt, `Transfer to ${user?.mobile}`, req.user.id);
        //5% deductions as admin charge // disabled due to payment gateway issue
        //amntToAdd = (parseFloat(amnt) - ((parseFloat(amnt) * 5) / 100));  
        //transfer to
        await creditToWallet(amnt, `Transfered by ${req.user?.userData?.mobile}`, user?._id);
      return res.json({ msg: SUCCESS });
    } catch (err) {
      console.log(err);
      return res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  });

module.exports = router;