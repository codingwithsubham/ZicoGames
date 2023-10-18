import React, { useState } from 'react';
import FiveMTradeSetter from './FiveMTradeSetter';
import { iStocks } from '../../common/common';

const FiveMStocks = ({ tradingClose, timerVal, wlt }) => {
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
            <span className={`hint ${itm?.color}`}>{itm?.mlt}X</span>
            <img src={require(`../../static/fruits/${itm.stock}.png`)} alt="" />
            <h1>{itm.name}</h1>
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
