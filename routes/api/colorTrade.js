const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  SERVER_ERROR,
  STATUS_CODE_500,
} = require("../../common/constant/constants");
const ColorTrade = require("../../models/ColorTrade");

// @route GET api/five-m-trade  
// @desc Get latest trade
// @access Private
router.get("/get-latest", auth, async (req, res) => {
  try {
    const trades = await ColorTrade.find();
    return res.json(trades.reverse()[0]);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/five-m-trade  
// @desc Get all trade records
// @access Private
router.get("/get-records", auth, async (req, res) => {
  try {
    const trades = await ColorTrade.find();
    return res.json(trades.reverse());
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
