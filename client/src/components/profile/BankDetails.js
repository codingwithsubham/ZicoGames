import React, { useEffect } from "react";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BankDetails = ({ loadUser, auth: { user } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="prfile bnk">
      <h1>Bank Details</h1>
      <div className="user-dtls">
      <div className="itm">
          <strong>Holder's Name:</strong> {user?.bankDetails?.bankingName}
        </div>
        <div className="itm">
          <strong>A/C Number:</strong> {user?.bankDetails?.acNumber}
        </div>
        <div className="itm">
          <strong>IFSC Code:</strong> {user?.bankDetails?.ifscCode}
        </div>
      </div>
      <h1>User Details</h1>
      <div className="user-dtls">
        <div className="itm">
          <strong>Name:</strong> {user?.name}
        </div>
        <div className="itm">
          <strong>Mobile:</strong> {user?.mobile}
        </div>
        <div className="itm">
          <strong>Age:</strong> {user?.age}
        </div>
        <div className="itm">
          <strong>User ID:</strong> {user?._id}
        </div>
      </div>
    </div>
  );
};

BankDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(BankDetails);
