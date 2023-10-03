import React, { useEffect, useState } from 'react';
import { getGameById } from '../../actions/wcGames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WCGameUnit from './WCGames/WCGameUnit';
import WalletSummry from '../wallet/WalletSummry';

const WCGameUser = ({ match, getGameById, socket }) => {
  const [game, setGame] = useState(null);
  const [wlt, setWlt] = useState(0);

  const wltBlnc = (data) => {
    setWlt(data);
  }

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
      <div className='card-gr' style={{marginTop: "10px"}}>
        <WalletSummry wltBlnc={wltBlnc} />
      </div>
      {game?.started ? (
        <div className="game-itms">
          <WCGameUnit game={game} socket={socket} wlt={wlt}/>
        </div>
      ) : (
        <div className="scrn-svr">
          <img src={require('../../static/crkt-loader.gif')} alt="" />
          <h3>Game is Yet To Start</h3>
        </div>
      )}
    </div>
  );
};

WCGameUser.propTypes = {
  getGameById: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getGameById,
})(WCGameUser);
