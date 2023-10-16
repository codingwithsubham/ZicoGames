import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getWallet } from "../../actions/wallet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showulDisplay } from "../../common/functions";

const WalletSummry = ({ wallet: { wallet }, getWallet, wltBlnc }) => {
  const display = showulDisplay();
  useEffect(() => {
    getWallet();
  }, [getWallet]);

  if (wallet?.blnc) {
    wltBlnc(wallet);
  }
  return (
    <div className="wlt-smry">
      <div className="icn-txt">
        <i className="fa fa-money"></i>
        <div className="txts">
          <h3>Total</h3>
          <p>Wallet Balance</p>
        </div>
      </div>
      <div className="wlt-vals">₹ {wallet?.blnc}</div>
      {display && (
        <div className="wlt-btn-grps">
          <Link
            to={`/submit-withdrawl/${wallet?.blnc}`}
            className="btn"
            style={{
              background: "#f44336",
              color: "#fff",
            }}
          >
            Withdraw
          </Link>
          <Link
            to="/wallet-top-up"
            className="btn"
            style={{
              background: "#4caf50",
              color: "#fff",
            }}
          >
            Top-up
          </Link>
        </div>
      )}
    </div>
  );
};

WalletSummry.propTypes = {
  getWallet: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, {
  getWallet,
})(WalletSummry);
