import React, { useEffect, useState } from 'react';
import { getGameById } from '../../../actions/wcGames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WCControlls from './WCGames/WCControlls';
import WCGameUnit from './WCGames/WCGameUnit';

const WCGame = ({ match, getGameById, socket }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.on('gameUpdated', (data) => setGame(data));
  }, [socket, game])

  useEffect(() => {
    getGameById(match.params.id).then((d) => setGame(d));
  }, [getGameById, match]); 

  return (
    <div className="game-wrap">
      <h1>WC - {game?.gameName}</h1>
      <p>{game?.gameDesc}</p>
      <WCControlls game={game} socket={socket} />
      {game?.started ? (
        <div className="game-itms">
          <WCGameUnit game={game} socket={socket} />
        </div>
      ) : (
        <div className="scrn-svr">
          <img src={require('../../../static/crkt-loader.gif')} alt="" />
          <h3>Game is Yet To Start</h3>
        </div>
      )}
    </div>
  );
};

WCGame.propTypes = {
  getGameById: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getGameById,
})(WCGame);
