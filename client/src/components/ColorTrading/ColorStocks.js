import React, { useState } from "react";
import ColorTradeSetter from "./ColorTradeSetter";

const ColorStocks = ({ tradingClose, timerVal, wlt }) => {
  const stocks = ["red", "yellow", "green"];
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
    <div className="trd-stks clor">
      {tradingClose && <div className="disble-sec fade">{timerVal}</div>}
      {stocks?.map((itm, idx) => (
        <div
          className="stk-itms"
          style={
            itm === "red"
              ? { backgroundColor: "#e63d31" }
              : itm === "yellow"
              ? { backgroundColor: "#ffeb3b" }
              : { backgroundColor: "#49aa4d" }
          }
          key={idx}
          onClick={() => {
            setShowPopup(true);
            setStockItem(itm);
          }}
        >
          {itm === "yellow" ? "3X" : "2X"}
        </div>
      ))}
      {showPopup && (
        <ColorTradeSetter
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

export default ColorStocks;
