import React, { useState } from "react";
import { requestPaymentGateway } from "../../actions/pg";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PaymentGateway = ({
  openPG,
  amnt,
  type,
  requestPaymentGateway,
}) => {
  const [paymentLink, setPaymentLink] = useState("");

  if (!paymentLink && openPG) {
    requestPaymentGateway(amnt, type).then((res) => {
      setPaymentLink(res?.data?.payment_url);
      window.location.href = res?.data?.payment_url;
    });
  }

  return (
    <div className="pg-styl">
      <div className="pg-popup">
        <div className="pg-element">
          <p>Payment Initiated. Do not Close or Go Back.</p>
        </div>
      </div>
    </div>
  );
};

PaymentGateway.propTypes = {
  requestPaymentGateway: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { requestPaymentGateway })(
  PaymentGateway
);
