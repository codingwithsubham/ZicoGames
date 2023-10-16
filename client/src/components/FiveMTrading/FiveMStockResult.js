import React, { Fragment, useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { getTradeRecords } from '../../actions/fiveMTrade';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FiveMStockResult = ({
  tradingClose,
  timerVal,
  fiveMTrade: { allTrdData },
  getTradeRecords,
}) => {
  const [ranNum, setranNum] = useState(9);
  useEffect(() => {
    getTradeRecords();
    setInterval(() => setranNum(Math.floor(Math.random() * 9 + 1)), 100);
  }, [getTradeRecords]);

  const [isApiCalled, setApiCalled] = useState(false);

  if (timerVal === 2 && !isApiCalled) {
    getTradeRecords();
    setApiCalled(true);
  }

  if (timerVal > 10 && isApiCalled) {
    setApiCalled(false);
  }

  return (
    <div className="rslt-dsply">
      {tradingClose ? (
        <div className="nmbr-flpr">
          <h1>Stock Rolling Onn</h1>
          <div className="spinner">
            <div class="loader" />
            <div className="flpr">
              <img src={require(`../../static/fruits/${ranNum}.png`)} alt="" />
            </div>
          </div>
          <p>Stockes are rolled to win.</p>
        </div>
      ) : (
        <div className="rslt-show">
          <h1>Last Winning Stock</h1>
          <div className="spinner">
            <div class="loader-nospin" />
            <div className="flpr">
              {allTrdData[0]?.result ? (
                allTrdData[0]?.result !== 'Running' ? (
                  <img
                    src={require(`../../static/fruits/${allTrdData[0]?.result}.png`)}
                    alt=""
                  />
                ) : (
                  <Fragment />
                )
              ) : (
                <Fragment />
              )}
            </div>
          </div>
          <p>It's the last winning stock number.</p>
        </div>
      )}
    </div>
  );
};

FiveMStockResult.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  fiveMTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fiveMTrade: state.fiveMTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(FiveMStockResult);
