const express = require('express');
const router = express.Router();
const {
  STATUS_CODE_500,
  SERVER_ERROR,
} = require('../../common/constant/constants');
const WCTrade = require('../../models/WCTrade');
const WCTradeItem = require('../../models/WCTradeItem');
const auth = require('../../middleware/auth');

// @route GET api/wc-games
// @desc GET WCTrade
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const wcTrades = await WCTrade.find({});
    res.json(wcTrades);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/wc-games
// @desc GET WCTrade
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const wcTrade = await WCTrade.findById(req.params.id);
    res.json(wcTrade);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route POST api/wc-games
// @desc CREATE WCTrade
// @access Private
router.post('/create', auth, async (req, res) => {
  const { name, desc } = req.body;
  try {
    const wcTrade = new WCTrade({
      gameName: name,
      date: new Date(),
      gameDesc: desc,
      started: false,
      completed: false,
    });
    await wcTrade.save();
    return res.json(wcTrade);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/wc-games
// @desc GET WCTradeItem
// @access Private
router.get('/item/:id', auth, async (req, res) => {
  try {
    const WCTradeItems = await WCTradeItem.find({
      tradeid: req.params.id,
    }).sort({ date: -1 });
    res.json(WCTradeItems);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
