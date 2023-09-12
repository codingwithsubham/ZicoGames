import React, { useEffect } from "react";
import { getCurrentTradingData } from "../../actions/userTrading";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ColorUserTradingData = ({
  colorTrade: { trdData },
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
                <div 
                  className="clr-icn"
                  style={
                    itm?.tradingData?.stock === "red"
                      ? { backgroundColor: "#e63d31" }
                      : itm?.tradingData?.stock === "yellow"
                      ? { backgroundColor: "#ffeb3b" }
                      : itm?.tradingData?.stock === "green"
                      ? { backgroundColor: "#49aa4d" }
                      : { backgroundColor: "#fff"}
                  }
                />
              </td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>;
};

ColorUserTradingData.propTypes = {
  getCurrentTradingData: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentTradingData,
})(ColorUserTradingData);
