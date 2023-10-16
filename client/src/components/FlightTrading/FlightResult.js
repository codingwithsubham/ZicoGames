import React, { useEffect, useState } from 'react';
import { getTradeRecords } from '../../actions/flightTrade';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { track } from '../../common/randomData.json';

const FlightResult = ({
  tradingClose,
  timerVal,
  flightTrade: { allTrdData },
  getTradeRecords,
}) => {
  const [ranNum, setranNum] = useState(6);
  useEffect(() => {
    getTradeRecords();
    setInterval(() => setranNum(Math.floor(Math.random() * 6 + 1)), 222);
  }, [getTradeRecords]);

  const [isApiCalled, setApiCalled] = useState(false);

  if (timerVal === 2 && !isApiCalled) {
    getTradeRecords();
    setApiCalled(true);
  }

  if (timerVal > 10 && isApiCalled) {
    setApiCalled(false);
  }

  const cars = [2, 3, 4, 5, 6];

  return (
    <div className="rslt-dsply">
      {tradingClose ? (
        <div className="nmbr-flpr">
          <h1>Stock Rolling Onn</h1>
          <div className="cars-trk">
            {cars.map((itm, idx) => (
              <div
                className={`cars ${ranNum === itm ? 'active' : ''}`}
                key={idx}
              >
                <img src={require(`../../static/car-logo/${itm}.png`)} alt="" />
              </div>
            ))}
          </div>
          <p>Stockes are rolled to win.</p>
        </div>
      ) : (
        <div className="rslt-show">
          <h1>Last Winning Stock</h1>
          <div className="roller-anim">
            <div className="cars-trk">
              {cars.map((itm, idx) => (
                <div
                  className={`cars ${
                    parseInt(allTrdData[0]?.result) === itm ? 'active' : ''
                  }`}
                  key={idx}
                >
                  <img
                    src={require(`../../static/car-logo/${itm}.png`)}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <p>It's the last winning stock number.</p>
        </div>
      )}
    </div>
  );
};

FlightResult.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  flightTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  flightTrade: state.flightTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(FlightResult);
