import React, { useEffect, useState } from 'react';
import { getTradeRecords } from "../../actions/flightTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { track } from "../../common/randomData.json"

const FlightResult = ({ tradingClose, timerVal, flightTrade: { allTrdData }, getTradeRecords }) => {
  const [ranNum, setranNum] = useState(9);
  useEffect(() => {
    getTradeRecords();
    setInterval(() => setranNum(Math.floor((Math.random() * 9) + 1)), 222);
  }, [getTradeRecords]);
  
  const [isApiCalled, setApiCalled] = useState(false);
  
  if (timerVal === 2 && !isApiCalled) {
    getTradeRecords();
    setApiCalled(true);
  }

  if(timerVal > 10 && isApiCalled) {
    setApiCalled(true);
  }

  return (
    <div className='rslt-dsply'>
      {tradingClose ? (
        <div className='nmbr-flpr'>
          <h1>Stock Rolling Onn</h1>
          <div className='roller-anim'>
            <img src={require("../../static/flight.gif")} alt="" />
            <div className='flpr'>
              {ranNum}
            </div>
            <marquee direction="left" scrollamount={10}>
            {track}
            </marquee>
          </div>
          <p>Stockes are rolled to win.</p>
        </div>
      ) : (
        <div className='rslt-show'>
          <h1>Last Winning Stock</h1>
          <div className='roller-anim'>
            <img src={require("../../static/flight_1.jpg")} alt="" />
            <div className='nmbr'>
              {allTrdData[1]?.result}
            </div>
          </div>
          <p>It's the last winning stock number.</p>
        </div>
      )
      }
    </div>
  )
}

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