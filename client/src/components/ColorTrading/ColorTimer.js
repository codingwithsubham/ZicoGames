import React, { useState } from "react";
import { useTimer } from "use-timer";
import { DECREMENTAL, TRADING_CLOSE, TRADING_START } from "../../common/common";
import { getLatstTrade } from "../../actions/colorTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ColorTimer = ({
  handleTradingClose,
  handleTradingStart,
  colorTrade: { trdData },
  getLatstTrade,
}) => {
  const { time, start, reset, advanceTime } = useTimer({
    initialTime: 0,
    timerType: DECREMENTAL,
  });
  const [apiCalled, setApiCalled] = useState(false);

  if (time === 0 && !apiCalled) {
    setApiCalled(true);
    getLatstTrade().then((trdData) => {
      const dt1 = new Date();
      const dt2 = new Date(trdData?.startTime);
      const diff = (dt2.getTime() - dt1.getTime()) / 1000;
      const diffTimer = 190 - Math.abs(Math.round(diff));
      if (diffTimer <= 0) {
        start();
        advanceTime(190);
      } else {
        start();
        advanceTime(-(diffTimer));
      }
    });
  }
  if (time === 1) {
    setApiCalled(false);
    reset();
    handleTradingStart({ type: TRADING_START, value: time });
  }
  if (time <= 10 && time > 1) {
    handleTradingClose({ type: TRADING_CLOSE, value: time });
  }

  return (
    <div className="trd-id-timr">
      <div className="trd-id">
        <div className='live-idctr blink'>
          <i className="fa fa-dot-circle-o dot blink"></i>
          <h4>Live</h4>
        </div>
        <div className="trd-id-vl">{trdData ? trdData?._id?.toString().substring(0,8) : "Loading.."}</div>
      </div>
      <div className="trd-timr">
        <div className="trd-txt">Left Time to Trade</div>
        <div className="trd-tmr-val">
          {Array.from(time.toString()).map((itm, idx) => (
            <div className="tmr-dgt" key={idx}>
              {itm}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ColorTimer.propTypes = {
  getLatstTrade: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
});

export default connect(mapStateToProps, {
  getLatstTrade,
})(ColorTimer);
