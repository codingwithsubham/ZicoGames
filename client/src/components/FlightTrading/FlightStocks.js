import React, { useState } from "react";
import FlightTradeSetter from "./FlightTradeSetter";

const FlightStocks = ({ tradingClose, timerVal, wlt }) => {
  const stocks = [2,3,4,5,6];
  const [stockItem, setStockItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => {
    setShowPopup(false);
    setStockItem(null);
  };

  if (tradingClose && showPopup) {
    setShowPopup(false);
  }

  return (
    <div className="trd-stks">
      {tradingClose && <div className="disble-sec fade">{timerVal}</div>}
      {stocks?.map((itm, idx) => (
        <div
          className="stk-itms"
          key={idx}
          onClick={() => {
            setShowPopup(true);
            setStockItem(itm);
          }}
        >
          {itm}X
        </div>
      ))}
      {showPopup && (
        <FlightTradeSetter
          wlt={wlt}
          stock={stockItem}
          handleClose={handleClose}
          tradingClose={tradingClose}
          timerVal={timerVal}
        />
      )}
    </div>
  );
};

export default FlightStocks;
