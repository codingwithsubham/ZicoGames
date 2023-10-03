const { wcDefaultData } = require('../common/constant/defaultData');
const WCTrade = require('../models/WCTrade');
const WCTradeItem = require('../models/WCTradeItem');
const { distributeWinning } = require("../zFunctions/wcFunctions");

// Socket.IO Events
exports.init = (socketIO) => {
  //##### connection
  socketIO.on('connection', (socket) => {
    //##### currentGameOn
    socket.on('currentGameOn', async (data) => {
      const wcTrade = await WCTrade.findOneAndUpdate(
        { _id: data._id },
        { $set: { started: true } },
        { useFindAndModify: false }
      );
      const wcTradeItem = new WCTradeItem(wcDefaultData);
      wcTradeItem.tradeid = data._id;
      wcTradeItem.date = new Date();
      await wcTradeItem.save();
      socketIO.emit('gameUpdated', { ...wcTrade._doc, started: true });
    });

    //##### currentGameClose
    socket.on('currentGameClose', async (data) => {
      const wcTrade = await WCTrade.findOneAndUpdate(
        { _id: data._id },
        { $set: { completed: true } },
        { useFindAndModify: false }
      );
      socketIO.emit('gameUpdated', { ...wcTrade._doc, completed: true });
    });

    //##### bettingClose
    socket.on('bettingClose', async (data) => {
        const wcTradeItem = await WCTradeItem.findOneAndUpdate(
          { _id: data._id },
          { $set: { bettingClosed: !data?.bettingClosed } },
          { useFindAndModify: false }
        );
        socketIO.emit('gameUnitUpdated', { ...wcTradeItem._doc, bettingClosed: !data?.bettingClosed });
      });

    //##### setGameResult
    socket.on('setGameResult', async (data) => {
        let wcTradeItem = await WCTradeItem.findById(data?.gameUnit?._id);
        wcTradeItem[data?.type].result = data?.res;
        await wcTradeItem.save();
        await distributeWinning(data);
        socketIO.emit('gameUnitUpdated', wcTradeItem);
      });

    //##### nextOver
    socket.on('nextOver', async (data) => {
        const wcTradeItem = new WCTradeItem(wcDefaultData);
        wcTradeItem.tradeid = data?.game?._id;
        wcTradeItem.over = parseInt(data?.gameUnit?.over) + 1;
        wcTradeItem.date = new Date();
        await wcTradeItem.save();
        socketIO.emit('gameReseted', wcTradeItem);
      });

    //##### disconnect
    socket.on('disconnect', () => {
      //console.log('🔥: A user disconnected');
    });
  });
};
