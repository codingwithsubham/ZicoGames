const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  SERVER_ERROR,
  STATUS_CODE_500,
  STATUS_CODE_400,
  BAD_REQUEST,
} = require("../../common/constant/constants");
const ColorTrade = require("../../models/ColorTrade");

// @route GET api/color-trade  
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

// @route GET api/color-trade  
// @desc Get all trade records
// @access Private
router.get("/get-records", auth, async (req, res) => {
  try {
    let trades = await ColorTrade.find();
    return res.json(trades.reverse().slice(1));
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/color-trade  
// @desc Get all trade records
// @access Private
router.post("/set-res", auth, async (req, res) => {
  const { id, result} = req.body;
  if(req.user.userData?.role === 'admin'){
    try {
      const trade = await ColorTrade.findOneAndUpdate(
        { _id: id },
        { $set: { result:  result } }
  
      );
      return res.json(trade);
    } catch (err) {
      console.log(err);
      res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  } else {
    res.status(STATUS_CODE_400).send(BAD_REQUEST);
  }
});

module.exports = router;
