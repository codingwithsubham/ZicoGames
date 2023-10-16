import React, { useState } from 'react';
import FiveMTradeSetter from './FiveMTradeSetter';

const FiveMStocks = ({ tradingClose, timerVal, wlt }) => {
  const iStocks = [
    { stock: 0, name: 'Mango' },
    { stock: 1, name: 'Apple' },
    { stock: 2, name: 'Banana' },
    { stock: 3, name: 'Orange' },
    { stock: 4, name: 'Watermelon' },
    { stock: 5, name: 'Jackfruit' },
    { stock: 6, name: 'Pineapple' },
    { stock: 7, name: 'Dragonfruit' },
    { stock: 8, name: 'Strawberry' },
    { stock: 9, name: 'Chery' },
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
            <span className='hint'>9X</span>
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
