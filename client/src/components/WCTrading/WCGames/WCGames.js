import React, { useState } from 'react';
import WCTradeSetter from './WCTradeSetter';

const WCGames = ({ gameUnit, socket, wlt }) => {
  const [stockItem, setStockItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => {
    setShowPopup(false);
    setStockItem(null);
  };
  //###### RUNS ######//
  const handleGameResult = (type, res) => {
    setStockItem({ type, gameUnit, res });
    setShowPopup(true);
  };

  return (
    <div className="wc-games users">
      <div className="runs">
        <h1>Runs..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.evenOdd?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.evenOdd?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
      </div>
      <div className="runs">
        <h1>Wickets..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.wicketorNo?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.wicketorNo?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
      </div>
      <div className="runs">
        <h1>Chauka..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.fourRuns?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.fourRuns?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
      </div>
      <div className="runs">
        <h1>Chakka..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.sixRuns?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            disabled={gameUnit?.bettingClosed}
            onClick={() => handleGameResult(gameUnit?.sixRuns?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
      </div>
      {showPopup && (
        <WCTradeSetter
          wlt={wlt}
          stock={stockItem}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default WCGames;
