import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLatstTrade } from "../../actions/colorTrade";
import { getLatestTradingData } from "../../actions/userTrading";

const ColorTrade = ({
  auth: { currenTradingData },
  colorTrade: { trdData },
  getLatstTrade,
  getLatestTradingData,
}) => {
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
    const answer = Object.values(currenTradingData.reduce((p, v) => {
      const old = p[v.user];
      if (!old)
        p[v.user] = { ...v, count: 1 };
      else if (old.sort > v.sort)
        p[v.user] = { ...v, count: old.count + 1 };
      else
        p[v.user].count++;
      return p;
    }, {}))

    return answer.length;
  }

  return (
    <div className="clr-trd-live">
      <h1>Color Trading Live Records</h1>
      <p>
        Total User Playing:{" "}
        {getTotalPlaying()}
      </p>
      <div className="invsts">
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#e63d31" }} />
            Red :
          </div>
          <div className="blnc">{getData("red")}</div>
        </div>
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#ffeb3b" }} />
            Yellow :
          </div>
          <div className="blnc">{getData("yellow")}</div>
        </div>
        <div className="inst-on">
          <div className="stk">
            <div className="clr-icn" style={{ backgroundColor: "#49aa4d" }} />
            Green :
          </div>
          <div className="blnc">{getData("green")}</div>
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
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLatstTrade,
  getLatestTradingData,
})(ColorTrade);
