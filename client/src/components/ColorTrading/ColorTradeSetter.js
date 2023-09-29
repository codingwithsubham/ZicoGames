import React, { useState } from "react";
import { setTradeData } from "../../actions/userTrading";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { COLOR } from "../../common/common";
import { setAlert } from "../../actions/alert";

const ColorTradeSetter = ({
  stock,
  handleClose,
  setTradeData,
  setAlert,
  wlt,
  colorTrade: { trdData },
}) => {
  const [amnt, setAmnt] = useState(5);
  const [mltply, setMltply] = useState(1);

  const handleSubmit = () => {
    if (!wlt) {
      setAlert("You need to Topup First !!", "danger");
    } else {
      if (parseInt(wlt?.blnc) < parseInt(amnt * mltply)) {
        setAlert("Don't have Enough Balance !!", "danger");
      } else {
        setTradeData({
          stock: stock,
          amnt: amnt * mltply,
          tradeId: trdData?._id,
          trdType: COLOR,
        });
      }
    }
    handleClose();
  };

  return (
    <div className="trd-sttr-wrpr">
      <div className="trd-sttr-bg" onClick={() => handleClose()} />
      <div className="trd-sttr-cntnt insta-an">
        <div className="trd-sttr-head">
          <h1>Rang-bazi</h1>
          <p>
            Chosen Stock: <strong>{stock}</strong>
          </p>
        </div>
        <div className="trd-sttr-bdy">
          <div className="trd-sttr-amnt">
            <h3>Investment Amount: </h3>
            <div className="invst-opts">
              <p
                className={amnt === 5 ? "active" : ""}
                onClick={() => setAmnt(5)}
              >
                5
              </p>
              <p
                className={amnt === 10 ? "active" : ""}
                onClick={() => setAmnt(10)}
              >
                10
              </p>
              <p
                className={amnt === 100 ? "active" : ""}
                onClick={() => setAmnt(100)}
              >
                100
              </p>
              <p
                className={amnt === 1000 ? "active" : ""}
                onClick={() => setAmnt(1000)}
              >
                1000
              </p>
              <p
                className={amnt === 2000 ? "active" : ""}
                onClick={() => setAmnt(2000)}
              >
                2000
              </p>
            </div>
          </div>
          <div className="trd-sttr-mltply">
            <h3>Multiply By: </h3>
            <div className="mltply-opts">
              <p
                className={mltply === 1 ? "active" : ""}
                onClick={() => setMltply(1)}
              >
                1
              </p>
              <p
                className={mltply === 5 ? "active" : ""}
                onClick={() => setMltply(5)}
              >
                5
              </p>
              <p
                className={mltply === 10 ? "active" : ""}
                onClick={() => setMltply(10)}
              >
                10
              </p>
              <p
                className={mltply === 20 ? "active" : ""}
                onClick={() => setMltply(20)}
              >
                20
              </p>
              <p
                className={mltply === 50 ? "active" : ""}
                onClick={() => setMltply(50)}
              >
                50
              </p>
              <p
                className={mltply === 100 ? "active" : ""}
                onClick={() => setMltply(100)}
              >
                100
              </p>
            </div>
          </div>
        </div>
        <div className="trd-winng-prz">
          <img
            src={require("../../static/nmbr.png")}
            alt=""
            className="winz-img"
          />
          <h2>{stock === "yellow" ? "3X" : "2X"}</h2>
          <h3>Return</h3>
        </div>
        <div className="trd-sttr-ftr">
          <div className="actn-btn-grps">
            <button
              className="btn"
              onClick={() => handleClose()}
              style={{
                background: "#f44336",
                color: "#fff",
              }}
            >
              {" "}
              Cancel{" "}
            </button>
            <button
              className="btn"
              onClick={() => handleSubmit()}
              style={{
                background: "#4caf50",
                color: "#fff",
              }}
            >
              {" "}
              Total: ₹ {amnt * mltply}/-{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ColorTradeSetter.propTypes = {
  setTradeData: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
  colorTrade: state.colorTrade,
});

export default connect(mapStateToProps, {
  setTradeData,
  setAlert,
})(ColorTradeSetter);
