import React, { useEffect } from 'react';
import { getTradeRecords } from '../../actions/fiveMTrade';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { iStocks } from '../../common/common';

const FiveMTradeRecords = ({ fiveMTrade: { allTrdData }, getTradeRecords }) => {
  useEffect(() => {
    getTradeRecords();
  }, [getTradeRecords]);

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
              <td>1,2 ka 9</td>
              <td>
                <div className="icn-dta">
                  {itm.result === 'Running' ? (
                    'Running'
                  ) : (
                    <img
                      className="td-img"
                      src={require(`../../static/fruits/${itm.result}.png`)}
                      alt=""
                    />
                  )}
                  {
                    iStocks.filter((x) => x.stock == parseInt(itm.result))[0]
                      ?.mlt
                  }
                  X
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

FiveMTradeRecords.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  fiveMTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fiveMTrade: state.fiveMTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(FiveMTradeRecords);
