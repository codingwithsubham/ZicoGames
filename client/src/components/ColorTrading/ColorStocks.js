import React, { useState } from "react";
import ColorTradeSetter from "./ColorTradeSetter";

const ColorStocks = ({ tradingClose, timerVal, wlt }) => {
  const iStocks = [
    { mlt: 2, color: 'red', stock: "red", name: 'Jack' },
    { mlt: 3, color: 'grn', stock: "yellow", name: 'Queen' },
    { mlt: 2, color: 'blu', stock: "green", name: 'King' },
  ];
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
      {iStocks?.map((itm, idx) => (
        <div className="stock-itm-wrap">
          <div
            className="stk-itms-wrp"
            key={idx}
            onClick={() => {
              setShowPopup(true);
              setStockItem(itm);
            }}
          >
            <span className={`hint ${itm.color}`}>{itm.mlt}X</span>
            <img src={require(`../../static/cards/${itm.stock}.png`)} alt="" />
            <h1>{itm.name}</h1>
          </div>
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
