import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RefferalBoard = ({ auth: { user } }) => {
  return (
    <div className="rfral-link">
      <div className="lbl">My refferal Link</div>
      <div id="myLink" className="link">
        https://{window.location.hostname}/register/refferal/{user._id}
      </div>
      <button
        className="btn mobile-hide"
        onClick={() => {
          navigator.clipboard.writeText(
            `https://${window.location.hostname}/register/refferal/${user._id}`
          );
          alert("Link Copied !!");
        }}
      >
        Copy Link
      </button>
    </div>
  );
};

RefferalBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RefferalBoard);
