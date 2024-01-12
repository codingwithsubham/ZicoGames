import React, { useState } from 'react';
import { topUpRequest } from "../../actions/wallet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const CompletePayment = ({ selected, topUpRequest, handleClose }) => {
    const [utr, setUtr] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        topUpRequest({
            utr,
            blnc: selected,
        });
        handleClose();
    };
    return (
        <div className="pymnt">
            {/* <div className="img-flbak">
                <img src={require("../../static/QR.jpg")} alt="" />
            </div> */}
            <div className="amnt-val">{selected}</div>
            {/* <div className="upi-id">Q075109365@ybl</div> */}
            {/* <div className="img-lnk-grp">
                <a href={`upi://pay?pa=Q075109365@ybl&am=${selected}`}>
                    <img src={require("../../static/bank_icon.png")} alt="" />
                    <h4>Pay Via GPay/phonePe/Paytm</h4>
                </a>
            </div> */}
            <ul>
                <li>
                    1. Transfer according to the displayed transfer information.
                </li>
                <li>
                    2. After completing the UPI transaction, must submit the UTR to
                    confirm the payment, If you do not back fill UTR, 100% of the
                    deposit transaction will fail.
                </li>
                <li>
                    3. Please do not save the current UPI transaction for next use,
                    you need to obtain the collection address again every time you
                    make a deposit.
                </li>
                <li>
                    4. If the payment is not received within 30 minutes, please
                    contact customer service for help and our responsible no more than
                    30 minutes.
                </li>
            </ul>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="inpt-group">
                    <label>UTR Number</label>
                    <input
                        id="utr"
                        type="text"
                        name="utr"
                        value={utr}
                        minLength={12}
                        maxLength={12}
                        onChange={(e) => setUtr(e.target.value)}
                    />
                </div>
                <button className="btn big">Complete Payment</button>
            </form>
            <div className="go-back" onClick={() => handleClose()}>Cancel</div>
        </div>
    )
}
CompletePayment.propTypes = {
    topUpRequest: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
    topUpRequest,
})(CompletePayment);