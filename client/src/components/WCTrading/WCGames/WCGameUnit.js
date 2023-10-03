import React, { Fragment, useEffect, useState } from 'react';
import { getGameUnit } from '../../../actions/wcGames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WCGames from './WCGames';
import WCUserTradingData from './WCUserTradingData';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WCTradeRecords from './WCTradeRecords';

const WCGameUnit = ({ game, socket, getGameUnit, wlt }) => {
  const [gameUnit, setGameUnit] = useState();
  const [allGameUnits, setAllGameUnits] = useState([]);

  useEffect(() => {
    getGameUnit(game._id).then((d) => {
      setGameUnit(d[0]);
      setAllGameUnits(d);
    });
  }, [getGameUnit, game]);

  useEffect(() => {
    socket.on('gameUnitUpdated', (data) => setGameUnit(data));
  }, [socket, gameUnit]);

  useEffect(() => {
    socket.on('gameReseted', () => {
      getGameUnit(game._id).then((d) => {
        setGameUnit(d[0]);
        setAllGameUnits(d);
      });
    });
  }, [socket, getGameUnit, game]);

  return (
    <div className="game-unit">
      {game?.completed ? (
        <div className="game-done">
          <img src={require('../../../static/cvr-wc.gif')} alt="" />
          <h3>Game Completed</h3>
        </div>
      ) : (
        <Fragment>
          <div className="ovr-unit" style={{ marginTop: '10px' }}>
            <h3>
              Running Over: <b>{gameUnit?.over}</b>
            </h3>
          </div>
          <WCGames gameUnit={gameUnit} socket={socket} wlt={wlt} />
        </Fragment>
      )}
      <div className="card-yl">
        <Tabs>
          <TabList>
            <Tab>Your Bets</Tab>
            <Tab>Past Overs</Tab>
          </TabList>
          <TabPanel>
            <WCUserTradingData tradeId={gameUnit?._id} />
          </TabPanel>
          <TabPanel>
            <WCTradeRecords
              allGameUnits={allGameUnits.filter((_, i) => i > 0)}
            />
          </TabPanel>
        </Tabs>
      </div>
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
