import React, { useEffect } from "react";
import { getCurrentTradingData } from "../../actions/userTrading";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const FlightUserTradingData = ({
  flightTrade: { trdData },
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
               <td className="clr-icn-data">
                {itm?.tradingData?.stock}
              </td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>;
};

FlightUserTradingData.propTypes = {
  getCurrentTradingData: PropTypes.func.isRequired,
  flightTrade: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  flightTrade: state.flightTrade,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentTradingData,
})(FlightUserTradingData);
