import React, { useEffect } from 'react';
import WCCreateGame from './WCCreateGame';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGames } from '../../../actions/wcGames';
import WCRecords from './WCRecords';

const WCAdminDash = ({ getGames, wcGames: { games } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <div className="wc-admin-dash-wrap">
      <h1>WC Admin Dashboard</h1>
      <p>Here all the WC Games Running and past will show...</p>
      <WCCreateGame />
      <WCRecords games={games}/>
    </div>
  );
};

WCAdminDash.propTypes = {
  getGames: PropTypes.func.isRequired,
  wcGames: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wcGames: state.wcGames,
});

export default connect(mapStateToProps, {
  getGames,
})(WCAdminDash);
