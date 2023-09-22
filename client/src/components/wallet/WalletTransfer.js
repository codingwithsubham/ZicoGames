import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { validateUser } from "../../actions/auth";
import { transferWalletBalance } from "../../actions/wallet";

const WalletTransfer = ({ validateUser, setAlert, transferWalletBalance }) => {
  const [data, setData] = useState({
    amnt: 0,
    mobNum: "",
  });
  const [userData, setUserData] = useState(null);
  const { amnt, mobNum } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const verifyUser = () => {
    if(mobNum !== ""){
      validateUser(mobNum).then((d) => setUserData(d));
    }  
  };

  const handleSubmit = () => {
    if (userData) {
      if (parseFloat(amnt) >= 100) {
        transferWalletBalance(amnt, userData);
        setData({
          amnt: 0,
          mobNum: "",
        });
        setUserData(null);
      } else {
        setAlert("Minimum Transfer Balance is 100", "danger");
      }
    } else {
      setAlert("Without Proper User, Balance can not be Transfered", "danger");
    }
  };

  return (
    <div>
      <div className="wlt-trns login-form insta-an">
        <h1>Wallet Transfer</h1>
        <div className="inpt-group">
          <label>Enter Amount</label>
          <input
            id="amnt"
            type="number"
            name="amnt"
            value={amnt}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inpt-group">
          <label>Enter Mobile Number</label>
          <input
            id="mobNum"
            type="text"
            name="mobNum"
            value={mobNum}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        {userData && (
          <p className="vrifed-name">
            <i className="fa fa-check"></i> {userData?.name}
          </p>
        )}
        {!userData ? (
          <button className="btn pyout-sbmt" onClick={() => verifyUser()}>
            Verify User
          </button>
        ) : (
          <button className="btn pyout-sbmt" onClick={() => handleSubmit()}>
            Transfer
          </button>
        )}
      </div>
    </div>
  );
};

WalletTransfer.propTypes = {
  validateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  transferWalletBalance: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  validateUser,
  setAlert,
  transferWalletBalance,
})(WalletTransfer);
