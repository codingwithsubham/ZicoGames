import React from 'react';

const WCControlls = ({ game, socket }) => {
  const handleStartGame = () => {
    socket.emit('currentGameOn', game);
  };
  const handleCloseGame = () => {
    socket.emit('currentGameClose', game);
  };
  return (
    <div className="game-cntrls">
      <button
        className="btn grn"
        disabled={game?.started}
        onClick={() => handleStartGame()}
      >
        Start Game
      </button>
      <h1>CONTROLLS</h1>
      <button
        className="btn rd"
        disabled={game?.started ? (game?.completed ? true : false) : true}
        onClick={() => handleCloseGame()}
      >
        Close Game
      </button>
    </div>
  );
};

export default WCControlls;
