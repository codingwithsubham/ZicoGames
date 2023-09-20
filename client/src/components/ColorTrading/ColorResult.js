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
  const [ranNum, setranNum] = useState(9);
  useEffect(() => {
    getTradeRecords();
    setInterval(() => setranNum(Math.floor(Math.random() * 9 + 1)), 222);
  }, [getTradeRecords]);

  const [isApiCalled, setApiCalled] = useState(false);
  
  if (timerVal === 2 && !isApiCalled) {
    setApiCalled(true);
    getTradeRecords().then();
  }

  if(timerVal > 10 && isApiCalled) {
    setApiCalled(false);
  }  
  
  return (
    <div className="rslt-dsply">
      {tradingClose ? (
        <div className="nmbr-flpr">
          <h1>Stock Rolling Onn</h1>
          <div className="clr-trd">
            <div
              className="flpr"
              style={
                ranNum % 3 === 0
                  ? { backgroundColor: "#e63d31" }
                  : ranNum % 3 === 1
                  ? { backgroundColor: "#ffeb3b" }
                  : { backgroundColor: "#49aa4d" }
              }
            ></div>
          </div>
          <p>Stockes are rolled to win.</p>
        </div>
      ) : (
        <div className="rslt-show">
          <h1>Last Winning Stock</h1>
          <div className="clr-trd">
            <div
              className="nmbr"
              style={
                allTrdData[0]?.result === "red"
                ? { backgroundColor: "#e63d31" }
                : allTrdData[0]?.result === "yellow"
                ? { backgroundColor: "#ffeb3b" }
                : allTrdData[0]?.result === "green"
                ? { backgroundColor: "#49aa4d" }
                : { backgroundColor: "#fff"}
              }
            ></div>
          </div>
          <p>It's the last winning stock number.</p>
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
