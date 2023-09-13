import React, { useState } from "react";
import {updateUserBank} from '../../actions/auth'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PoupUp from "../layout/PoupUp";

const UpdateBankDetails = ({updateUserBank}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormdata] = useState({
    bankingName: "",
    acNumber: "",
    ifscCode: ""
  });
  const { acNumber, ifscCode, bankingName } = formData;

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const updateBank = () => {
    if (acNumber !== "" && ifscCode !== "" && bankingName !== "") {
      const user = {
        bankDetails: {
          bankingName, acNumber, ifscCode
        }
      }
      //update bank
      updateUserBank({user});
      setFormdata({
        bankingName: "",
        acNumber: "",
        ifscCode: ""
      });
      setShowPopup(true);
    } else {
      setError("Plz Fill The Form!!");
    }
  };

  const handleStartPoupUp = () => {
    setShowPopup(false);
  };

  return (
    <div className="login-form insta-an">
      {showPopup && (
        <PoupUp
          hdr={"Bank Updated !!"}
          btns={["Got It !!"]}
          desc={"Bank Details Updated. Next Time Onwards all payout will be transfered to this account..."}
          btnClicked={handleStartPoupUp}
        />
      )}
      <h1>Update / Add Bank Details</h1>
      {error && <span className="form-error">{error}</span>}
      <input
        onChange={(e) => handleChange(e)}
        name="bankingName"
        className="topup-amnt"
        value={bankingName}
        placeholder="Enter Holder's Name"
        type="text"
      />
      <input
        onChange={(e) => handleChange(e)}
        name="acNumber"
        className="topup-amnt"
        value={acNumber}
        placeholder="Enter the A/c Number"
        type="number"
      />
      <input
        onChange={(e) => handleChange(e)}
        name="ifscCode"
        className="topup-amnt"
        value={ifscCode}
        placeholder="Enter the IFSC Code"
        type="text"
      />
      <button className="btn sm" onClick={() => updateBank()}>
        Update Bank Details
      </button>
    </div>
  );
};

UpdateBankDetails.propTypes = {
  updateUserBank: PropTypes.func.isRequired
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { updateUserBank })(
  UpdateBankDetails
);
