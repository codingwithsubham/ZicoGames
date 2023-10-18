import React, { useEffect, useState } from "react";
import { getTradeRecords } from "../../actions/colorTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ColorResult = ({
  tradingClose,
  timerVal,
  colorTrade: { allTrdData },
  getTradeRecords,
}) => {
  const [ranNum, setranNum] = useState(1);
  useEffect(() => {
    getTradeRecords();
    setInterval(() => setranNum(Math.floor(Math.random() * 3 + 1)), 111);
  }, [getTradeRecords]);

  const [isApiCalled, setApiCalled] = useState(false);
  
  if (timerVal === 2 && !isApiCalled) {
    setApiCalled(true);
    getTradeRecords().then();
  }

  if(timerVal > 10 && isApiCalled) {
    setApiCalled(false);
  }  

  const cards = ['red', 'yellow', 'green'];
  
  return (
    <div className="rslt-dsply clr">
      {tradingClose ? (
        <div className="nmbr-flpr">
          <h1>Rolling Onn</h1>
          <div className="cars-trk">
            {cards.map((itm, idx) => (
              <div
                className={`cars ${ranNum === (idx+1) ? 'active' : ''}`}
                key={idx}
              >
                <img src={require(`../../static/cards/${itm}.png`)} alt="" />
              </div>
            ))}
          </div>
          <p>Items are rolled to win.</p>
        </div>
      ) : (
        <div className="rslt-show clr">
          <h1>Last Winning</h1>
          <div className="roller-anim">
            <div className="cars-trk">
              {cards.map((itm, idx) => (
                <div
                  className={`cars ${
                    allTrdData[0]?.result === itm ? 'active' : ''
                  }`}
                  key={idx}
                >
                  <img
                    src={require(`../../static/cards/${itm}.png`)}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <p>It's the last winning of the game.</p>
        </div>
      )}
    </div>
  );
};

ColorResult.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(ColorResult);
