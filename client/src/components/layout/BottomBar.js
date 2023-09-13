import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { showulDisplay } from "../../common/functions";

const BottomBar = ({ auth: { isAuthenticated, user } }) => {
  const display = showulDisplay();
  return (
    isAuthenticated &&
    user && (
      <div className="btm-bar">
        <div className="btm-bar-wrap">
          <NavLink to="/home">
            <i className="fa fa-home"></i>
            <div className="btm-txt">Home</div>
          </NavLink>
          <NavLink to="/wallet">
            <i className="fa fa-money"></i>
            <div className="btm-txt">Wallet</div>
          </NavLink>
          {display && (
            <NavLink to="/withdrawl">
              <i className="fa fa-bank"></i>
              <div className="btm-txt">Payout</div>
            </NavLink>
          )}
        </div>
      </div>
    )
  );
};

BottomBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(BottomBar);
