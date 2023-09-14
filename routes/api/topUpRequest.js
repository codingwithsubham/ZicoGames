const express = require("express");
const router = express.Router();
const {
    STATUS_CODE_500,
    SERVER_ERROR,
    PENDING,
    APPROVED,
    STATUS_CODE_400,
    REJECTED,
} = require("../../common/constant/constants");
const TopUpRequest = require("../../models/TopUpRequest");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { creditToWallet } = require("../../functions/walletFunctions");

// @route GET api/top-up-request
// @desc GET PENDING REQUEST
// @access Private
router.get("/pending", auth, async (req, res) => {
    try {
        const tpupData = await TopUpRequest.find({ status: PENDING }).sort({date: -1});
        return res.json(tpupData);
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/top-up-request
// @desc APPROVE PENDING REQUEST
// @access Private
router.post("/approve", auth, async (req, res) => {
    const { id } = req.body;
    try {
        const tpupData = await TopUpRequest.findOneAndUpdate(
            { _id: id },
            { $set: { status: APPROVED } }
        );
        await disburshWalletCredit(tpupData?.blnc, tpupData?.user);
        return res.json({status: true});
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/top-up-request
// @desc DECLINE PENDING REQUEST
// @access Private
router.post("/decline", auth, async (req, res) => {
    const { id } = req.body;
    try {
        const tpupData = await TopUpRequest.findOneAndDelete(
            { _id: id }
        );
        return res.json(tpupData);
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

// @route POST api/top-up-request
// @desc SUBMIT A TOP-UP REQUEST
// @access Private
router.post("/submit", auth, async (req, res) => {
    try {
        const { utr, blnc } = req.body;
        const date = new Date();
        const checkDuplicate = await TopUpRequest.findOne({ utr: utr });
        if (checkDuplicate) {
            return res
                .status(STATUS_CODE_400)
                .json({ error: "Duplicate UTR !! Top-up Request Not Submitted !!" });
        }
        const topUpRequest = new TopUpRequest({
            utr,
            blnc,
            status: PENDING,
            date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
            user: req.user.id,
            userData: req.user.userData,
        });
        await topUpRequest.save();
        return res.json(topUpRequest);
    } catch (err) {
        res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
});

const disburshWalletCredit = async (blnc, id) => {
    const perct = [8,0.5,0.5,0.5,0.5]
    let user = await User.findOne({ _id: id }).populate("upline");
    await creditToWallet(parseInt(blnc), "Top-Up Added", user?._id);
    if (!user.status) {
      user.status = true;
      await user.save();
    }
    for (element of perct) {
      const amnt = (parseInt(blnc) * element) / 100;
      if(user?.upline){
        await creditToWallet(parseInt(amnt), "Top-Up Added", user?.upline);
        user = await User.findOne({ _id: user?.upline }).populate("upline");
      } else {
        user = null;
      }
    }
  }

module.exports = router;