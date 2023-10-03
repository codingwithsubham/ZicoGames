const mongoose = require('mongoose');

const WCTradeItemSchema = new mongoose.Schema({
  tradeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wcTrade',
    require: true,
  },
  date: {
    type: Date,
  },
  over: {
    type: Number,
  },
  bettingClosed: {
    type: Boolean,
    default: false,
  },
  evenOdd: {
    trdType: {
      type: String,
      default: 'evenOdd',
    },
    result: {
      type: String,
    },
    stocks: {
      even: {
        type: Number,
      },
      odd: {
        type: Number,
      },
    },
  },
  wicketorNo: {
    trdType: {
      type: String,
      default: 'wicketorNo',
    },
    result: {
      type: String,
    },
    stocks: {
      even: {
        type: Number,
      },
      odd: {
        type: Number,
      },
    },
  },
  fourRuns: {
    trdType: {
      type: String,
      default: 'fourRuns',
    },
    result: {
      type: String,
    },
    stocks: {
      even: {
        type: Number,
      },
      odd: {
        type: Number,
      },
    },
  },
  sixRuns: {
    trdType: {
      type: String,
      default: 'sixRuns',
    },
    result: {
      type: String,
    },
    stocks: {
      even: {
        type: Number,
      },
      odd: {
        type: Number,
      },
    },
  },
});

module.exports = WCTradeItem = mongoose.model('wcTradeItem', WCTradeItemSchema);
