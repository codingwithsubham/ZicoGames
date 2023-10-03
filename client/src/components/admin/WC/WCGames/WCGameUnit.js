import React, { Fragment, useEffect, useState } from 'react';
import { getGameUnit } from '../../../../actions/wcGames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WCGames from './WCGames';
import WCTradeRecords from './WCTradeRecords';

const WCGameUnit = ({ game, socket, getGameUnit }) => {
  const [gameUnit, setGameUnit] = useState();
  const [allGameUnits, setAllGameUnits] = useState([]);

  useEffect(() => {
    getGameUnit(game._id).then((d) => {
      setGameUnit(d[0]);
      setAllGameUnits(d);
    });
  }, [getGameUnit, game]);

  useEffect(() => {
    socket.on('gameUnitUpdated', (data) => {
      setGameUnit(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('gameReseted', () => {
      getGameUnit(game._id).then((d) => {
        setGameUnit(d[0]);
        setAllGameUnits(d);
      });
    });
  }, [socket, getGameUnit, game]);

  const handleNextOver = () => {
    socket.emit('nextOver', { game, gameUnit });
  };

  return (
    <div className="game-unit">
      {game?.completed ? (
        <div className="game-done">
          <img src={require('../../../../static/cvr-wc.gif')} alt="" />
          <h3>Game Completed</h3>
        </div>
      ) : (
        <Fragment>
          <div className="ovr-unit">
            <h3>
              Running Over: <b>{gameUnit?.over}</b>
            </h3>
            <button onClick={() => handleNextOver()} className="btn">
              Next Over
            </button>
          </div>
          <WCGames gameUnit={gameUnit} socket={socket} />
        </Fragment>
      )}
      <WCTradeRecords allGameUnits={allGameUnits.filter((_, i) => i > 0)} />
    </div>
  );
};

WCGameUnit.propTypes = {
  getGameUnit: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getGameUnit,
})(WCGameUnit);
