import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = ({ auth: { isAuthenticated, user } }) => {
  let dt = new Date();
  return isAuthenticated && user && (
    <div className="footer">
      <div className="ftr-txt">
        Created with <i className="fa fa-heart"></i> in India.
      </div>
      <div className="ftr-cpyryt">
        Copyright© {dt.getFullYear()} Zico Games Ltd.
      </div>
    </div>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
})(Footer);
