import React, { useEffect } from 'react';
import { getTradeRecords } from '../../actions/colorTrade';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ColorTradeRecords = ({ colorTrade: { allTrdData }, getTradeRecords }) => {
  useEffect(() => {
    getTradeRecords();
  }, [getTradeRecords]);

  const iStocks = [
    { mlt: 2, color: 'red', stock: 'red', name: 'Jack' },
    { mlt: 3, color: 'grn', stock: 'yellow', name: 'Queen' },
    { mlt: 2, color: 'blu', stock: 'green', name: 'King' },
  ];

  return (
    <div className="trd-rcrds">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Trde ID</th>
            <th>Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {allTrdData?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm?._id?.toString().substring(0, 8)}</td>
              <td>Card-bazi</td>
              <td>
                <div className="icn-dta">
                  {itm.result === 'Running' ? (
                    'Running'
                  ) : (
                    <img
                      className="td-img"
                      src={require(`../../static/cards/${itm.result}.png`)}
                      alt=""
                    />
                  )}
                  {iStocks.filter((x) => x.stock === itm.result)[0]?.name} -
                  {iStocks.filter((x) => x.stock === itm.result)[0]?.mlt}X
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ColorTradeRecords.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(ColorTradeRecords);
