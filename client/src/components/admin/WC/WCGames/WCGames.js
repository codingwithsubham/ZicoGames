import React from 'react';

const WCGames = ({ gameUnit, socket }) => {
  //###### RUNS ######//
  const handleGameResult = (type, res) => {
    socket.emit('setGameResult', { type, gameUnit, res });
  };

  //###### Off Toggle ######//
  const handleBettingClose = () => {
    socket.emit('bettingClose', gameUnit);
  };

  return (
    <div className="wc-games">
      <div className="ovr-unit lck-bt">
        <h3>Lock Betting</h3>
        <button className="btn" onClick={() => handleBettingClose()}>
          {gameUnit?.bettingClosed ? 'Un-Lock' : 'Lock'}
        </button>
      </div>
      <div className="runs">
        <h1>Runs..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            onClick={() => handleGameResult(gameUnit?.evenOdd?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            onClick={() => handleGameResult(gameUnit?.evenOdd?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
        <p>
          <b>Even : </b> {gameUnit?.evenOdd?.stocks?.even} |{' '}
          <b>Odd :</b> {gameUnit?.evenOdd?.stocks?.odd}
        </p>
      </div>
      <div className="runs">
        <h1>Wickets..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            onClick={() => handleGameResult(gameUnit?.wicketorNo?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            onClick={() => handleGameResult(gameUnit?.wicketorNo?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
        <p>
          <b>Even : </b> {gameUnit?.wicketorNo?.stocks?.even} |{' '}
          <b>Odd : </b> {gameUnit?.wicketorNo?.stocks?.odd}
        </p>
      </div>
      <div className="runs">
        <h1>Chauka..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            onClick={() => handleGameResult(gameUnit?.fourRuns?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            onClick={() => handleGameResult(gameUnit?.fourRuns?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
        <p>
          <b>Even : </b> {gameUnit?.fourRuns?.stocks?.even} |{' '}
          <b>Odd : </b> {gameUnit?.fourRuns?.stocks?.odd}
        </p>
      </div>
      <div className="runs">
        <h1>Chakka..</h1>
        <p>You need to predict</p>
        <div className="res-grp">
          <button
            onClick={() => handleGameResult(gameUnit?.sixRuns?.trdType, 'even')}
            className="btn res-itm grn"
          >
            Even
          </button>
          <button
            onClick={() => handleGameResult(gameUnit?.sixRuns?.trdType, 'odd')}
            className="btn res-itm rd"
          >
            Odd
          </button>
        </div>
        <p>
          <b>Even : </b> {gameUnit?.sixRuns?.stocks?.even} |{' '}
          <b>Odd : </b> {gameUnit?.sixRuns?.stocks?.odd}
        </p>
      </div>
    </div>
  );
};

export default WCGames;
