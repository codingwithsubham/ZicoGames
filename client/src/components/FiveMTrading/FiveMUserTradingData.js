import React, { useEffect } from "react";
import { getCurrentTradingData } from "../../actions/userTrading";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const FiveMUserTradingData = ({
  fiveMTrade: { trdData },
  getCurrentTradingData,
  auth: { currenTradingData },
}) => {
  useEffect(() => {
    trdData?._id && getCurrentTradingData(trdData?._id);
  }, [getCurrentTradingData, trdData]);

  return <div className="usr-trd-data">
    <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {currenTradingData?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm?.tradingData?.stock}</td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>;
};

FiveMUserTradingData.propTypes = {
  getCurrentTradingData: PropTypes.func.isRequired,
  fiveMTrade: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fiveMTrade: state.fiveMTrade,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentTradingData,
})(FiveMUserTradingData);
