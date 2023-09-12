import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BottomBar = ({auth: { isAuthenticated, user }}) => {
  return isAuthenticated && user && (
    <div className="btm-bar">
      <div className="btm-bar-wrap">
          <Link to="/home">
            <i className="fa fa-home"></i>
            <div className="btm-txt">Home</div>
          </Link>
          <Link to="/wallet">
            <i className="fa fa-money"></i>
            <div className="btm-txt">Wallet</div>
          </Link>
          <Link to="/withdrawl">
            <i className="fa fa-bank"></i>
            <div className="btm-txt">Withdrawl</div>
          </Link>
        </div>
    </div>
  );
};

BottomBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
})(BottomBar);
