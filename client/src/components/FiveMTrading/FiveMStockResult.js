import React, { Fragment, useEffect, useState } from 'react';
import { getTradeRecords } from '../../actions/fiveMTrade';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { iStocks } from '../../common/common';

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
          <h1>Rolling Onn</h1>
          <div className="spinner">
            <div class="loader" />
            <div className="flpr">
              <img src={require(`../../static/fruits/${ranNum}.png`)} alt="" />
            </div>
          </div>
          <p>Items are rolled to win.</p>
        </div>
      ) : (
        <div className="rslt-show">
          <h1>Last Winning</h1>
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
              <div className='mltply'>{iStocks.filter(x => x.stock === parseInt(allTrdData[0]?.result))[0]?.mlt}X</div>
            </div>
          </div>
          <p>It's the last winning of the game.</p>
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
