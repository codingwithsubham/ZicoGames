import React, { useEffect } from 'react';
import { getCurrentTradingData } from '../../actions/userTrading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FlightUserTradingData = ({
  flightTrade: { trdData },
  getCurrentTradingData,
  auth: { currenTradingData },
}) => {
  useEffect(() => {
    trdData?._id && getCurrentTradingData(trdData?._id);
  }, [getCurrentTradingData, trdData]);

  const itmVal = [2,3,4,5,6];

  return (
    <div className="usr-trd-data">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className='img-bdy'>
          {currenTradingData?.map((itm, idx) => (
            <tr key={idx}>
              <td>
                {!itmVal.includes(parseInt(itm?.tradingData?.stock)) ? (
                  'Loading...'
                ) : (
                  <img
                    className="usr-td-img"
                    src={require(`../../static/car-logo/${itm?.tradingData?.stock}.png`)}
                    alt=""
                  />
                )}
              </td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
