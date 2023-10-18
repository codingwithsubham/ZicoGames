import React, { useEffect } from 'react';
import { getCurrentTradingData } from '../../actions/userTrading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ColorUserTradingData = ({
  colorTrade: { trdData },
  getCurrentTradingData,
  auth: { currenTradingData },
}) => {
  useEffect(() => {
    trdData?._id && getCurrentTradingData(trdData?._id);
  }, [getCurrentTradingData, trdData]);

  const iStocks = [
    { mlt: 2, color: 'red', stock: 'red', name: 'Jack' },
    { mlt: 3, color: 'grn', stock: 'yellow', name: 'Queen' },
    { mlt: 2, color: 'blu', stock: 'green', name: 'King' },
  ];

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
              <td>
                <div className="icn-dta">
                  {itm.result === 'Running' ? (
                    'Running'
                  ) : (
                    <img
                      className="usr-td-img"
                      src={require(`../../static/cards/${itm?.tradingData?.stock}.png`)}
                      alt=""
                      style={{marginRight: "10px"}}
                    />
                  )}
                  {iStocks.filter((x) => x.stock == itm?.tradingData?.stock)[0]?.name} - {' '}
                  {iStocks.filter((x) => x.stock == itm?.tradingData?.stock)[0]?.mlt}X
                </div>
              </td>
              <td>{itm?.tradingData?.amnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
