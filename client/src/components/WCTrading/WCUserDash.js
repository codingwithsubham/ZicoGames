import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGames } from '../../actions/wcGames';
import WCRecords from './WCRecords';

const WCUserDash = ({ getGames, wcGames: { games } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <div className="wc-admin-dash-wrap user-brd">
      <img src={require("../../static/cvr-wc.gif")} alt="" />
      <h1>It's Time for Cricket</h1>
      <p>Here all the Cricket Games Running and past will show...</p>
      <WCRecords games={games}/>
    </div>
  );
};

WCUserDash.propTypes = {
  getGames: PropTypes.func.isRequired,
  wcGames: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wcGames: state.wcGames,
});

export default connect(mapStateToProps, {
  getGames,
})(WCUserDash);
