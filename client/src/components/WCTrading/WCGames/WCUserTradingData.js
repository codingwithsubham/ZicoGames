import React, { useEffect } from 'react';
import { getCurrentTradingData } from '../../../actions/userTrading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WCUserTradingData = ({
  tradeId,
  getCurrentTradingData,
  auth: { currenTradingData },
}) => {
  useEffect(() => {
    tradeId && getCurrentTradingData(tradeId);
  }, [getCurrentTradingData, tradeId]);

  return (
    <div className="usr-trd-data">
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
                {itm?.trdType === 'evenOdd'
                  ? 'Runs'
                  : itm?.trdType === 'wicketorNo'
                  ? 'Wicket'
                  : itm?.trdType === 'fourRuns'
                  ? 'Choukas'
                  : itm?.trdType === 'sixRuns'
                  ? 'Chakkas'
                  : ''} - {" "}
                {itm?.tradingData?.stock}
              </td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

WCUserTradingData.propTypes = {
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
})(WCUserTradingData);
