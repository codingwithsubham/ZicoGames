import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import UpdateBankDetails from "./UpdateBankDetails";
import BankDetails from "./BankDetails";

const Profile = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <div className="profile">
      <div className="row update-bnk">
        <div className="col-2">
          <BankDetails />
        </div>
        <div className="col-2">
          <UpdateBankDetails />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(Profile);
