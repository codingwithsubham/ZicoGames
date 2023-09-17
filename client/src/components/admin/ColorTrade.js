import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLatstTrade, setTradeResult } from "../../actions/colorTrade";
import { getLatestTradingData } from "../../actions/userTrading";
import { useTimer } from "use-timer";
import { DECREMENTAL } from "../../common/common";

const ColorTrade = ({
  auth: { currenTradingData },
  colorTrade: { trdData },
  getLatstTrade,
  getLatestTradingData,
  setTradeResult,
}) => {
  //timer
  const [apicalled, setApiCalled] = useState(false);
  const { time, start, reset, advanceTime } = useTimer({
    initialTime: 0,
    timerType: DECREMENTAL,
  });

  const getTime = () => {
    const dt1 = new Date();
      const dt2 = new Date(trdData?.startTime);
      const diff = (dt2.getTime() - dt1.getTime()) / 1000;
      const diffTimer = 60 - Math.abs(Math.round(diff));
      if (diffTimer <= 0) {
        start();
        advanceTime(60);
      } else {
        start();
        advanceTime(-(diffTimer));
      }
  }

  if(time === 0 && trdData){
    getTime();
    setApiCalled(false);
  }

  if(time < 0 && !apicalled) {
    setApiCalled(true);
    getLatstTrade().then( () => (
      reset()
    ))
  }

  //logic
  useEffect(() => {
    getLatstTrade();
  }, [getLatstTrade]);

  useEffect(() => {
    trdData?._id && getLatestTradingData(trdData?._id);
  }, [trdData, getLatestTradingData]);

  const refresh = () => {
    getLatstTrade();
  };

  const getData = (clause) => {
    let tot = 0;
    currenTradingData.forEach((x) => {
      if (x?.tradingData?.stock === clause) {
        tot = tot + parseInt(x?.tradingData?.amnt);
      }
    });
    return tot;
  };

  const getTotalPlaying = () => {
    const answer = Object.values(
      currenTradingData.reduce((p, v) => {
        const old = p[v.user];
        if (!old) p[v.user] = { ...v, count: 1 };
        else if (old.sort > v.sort) p[v.user] = { ...v, count: old.count + 1 };
        else p[v.user].count++;
        return p;
      }, {})
    );

    return answer.length;
  };

  const [processing, setProcesing] = useState(false);
  const setResult = (result) => {
    setProcesing(true);
    if (trdData?._id) {
      setTradeResult({ id: trdData?._id, result: result }).then(() =>
        setProcesing(false)
      );
    }
  };

  return (
    <div className="clr-trd-live">
      <h1>Color Trading Live Records</h1>
      <p>Total User Playing: {getTotalPlaying()}</p>
      <p>Current Result: <b>{trdData?.result}</b></p>
      <div className="float-timer">{time}</div>
      <div className="invsts">
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#e63d31" }} />
            Red :
          </div>
          <div className="blnc">{getData("red")}</div>
          <div className="actn">
            {!processing && <button className="btn grn" onClick={() => setResult("red")}>
              Set
            </button>}
          </div>
        </div>
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#ffeb3b" }} />
            Yellow :
          </div>
          <div className="blnc">{getData("yellow")}</div>
          <div className="actn">
            {!processing && <button className="btn grn" onClick={() => setResult("yellow")}>
              Set
            </button>}
          </div>
        </div>
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#49aa4d" }} />
            Green :
          </div>
          <div className="blnc">{getData("green")}</div>
          <div className="actn">
           {!processing && <button className="btn grn" onClick={() => setResult("green")}>
              Set
            </button>}
          </div>
        </div>
      </div>

      <button className="btn big" onClick={() => refresh()}>
        Refresh
      </button>
    </div>
  );
};

ColorTrade.propTypes = {
  auth: PropTypes.object.isRequired,
  colorTrade: PropTypes.object.isRequired,
  getLatstTrade: PropTypes.func.isRequired,
  getLatestTradingData: PropTypes.func.isRequired,
  setTradeResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLatstTrade,
  getLatestTradingData,
  setTradeResult,
})(ColorTrade);
