import React, { useState } from "react";
import FlightTradeSetter from "./FlightTradeSetter";

const FlightStocks = ({ tradingClose, timerVal, wlt }) => {
  const iStocks = [
    { color: 'red', stock: 2, name: 'Suzuki' },
    { color: 'grn', stock: 3, name: 'MG' },
    { color: 'blu', stock: 4, name: 'Audi' },
    { color: 'pnk', stock: 5, name: 'Mersidez' },
    { color: 'ylw', stock: 6, name: 'BMW' },
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
    <div className="trd-stks">
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
            <span className={`hint ${itm.color}`}>{itm.stock}X</span>
            <img src={require(`../../static/car-logo/${itm.stock}.png`)} alt="" />
            <h1>{itm.name}</h1>
          </div>
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
