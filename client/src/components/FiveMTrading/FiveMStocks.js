import React, { useState } from "react";
import FiveMTradeSetter from "./FiveMTradeSetter";

const FiveMStocks = ({ tradingClose, timerVal, wlt }) => {
  const stocks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        <div className="stock-itm-wrap">
          <div
            className="stk-itms"
            key={idx}
            onClick={() => {
              setShowPopup(true);
              setStockItem(itm);
            }}
          >
            {itm}
          </div>
        </div>
      ))}
      {showPopup && (
        <FiveMTradeSetter
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

export default FiveMStocks;
