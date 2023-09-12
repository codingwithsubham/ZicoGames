import React, { useState } from "react";
import { withdrawlRequest } from "../../actions/withdrwl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Link, Redirect } from "react-router-dom";

const SubmitWithdrawlReq = ({ withdrawlRequest, match, setAlert, auth: { user } }) => {
  const wltBlnc = match.params.blnc;
  const [blnc, setBlnc] = useState("");
  const [isRequested, setRequested] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setRequested(true);
    if (wltBlnc > 0) {
      if (wltBlnc >= parseInt(blnc)) {
        withdrawlRequest({ blnc, bankDetails: user?.bankDetails });
      } else {
        setAlert("Don't have Enough Balance !!", "danger");
      }
    } else {
      setAlert("You need to Topup First !!", "danger");
    }
  };

  if (isRequested) {
    return <Redirect to="/withdrawl" />
  }

  return (
    <div className="withdrwl">
      <div className="img-flbak">
        <img src={require("../../static/waltanim.gif")} alt="" />
      </div>
      <h1> Submit a Withdrawl Request </h1>
      <p className="notice">
        1. Payout Requests after 11 AM will be considered as next day payout as
        per Bank Guidlines. 2. We don't have any Hold/Pending Mechanism. It's
        completely automatic payout system By The Bank, From The Bank, To The
        Bank.
      </p>
      <form className="login-form withdrw" onSubmit={(e) => handleSubmit(e)}>
        <div className="inpt-group">
          <label>Enter Amount</label>
          <input
            id="blnc"
            type="number"
            name="blnc"
            value={blnc}
            onChange={(e) => setBlnc(e.target.value)}
          />
        </div>
        <button className="btn big">Complete Payment</button>
      </form>
      <Link to="/withdrawl" className="go-back">Cancel</Link>
    </div>
  );
};

SubmitWithdrawlReq.propTypes = {
  withdrawlRequest: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  withdrawlRequest,
  setAlert,
})(SubmitWithdrawlReq);
