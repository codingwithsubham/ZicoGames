import React, { useState } from 'react';
import WalletSummry from '../wallet/WalletSummry';
import FiveMTimer from './FiveMTimer';
import FiveMStocks from './FiveMStocks';
import { TRADING_CLOSE, TRADING_START } from '../../common/common';
import FiveMTradeRecords from './FiveMTradeRecords';
import FiveMStockResult from './FiveMStockResult';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FiveMUserTradingData from './FiveMUserTradingData';

const FiveMTrading = () => {
  const [tradingClose, setTradingClose] = useState(false);
  const [timerVal, setTimerVal] = useState(0);
  const [wlt, setWlt] = useState(0);

  const handleTradingClose = ({ type, value }) => {
    if (type === TRADING_CLOSE) {
      setTradingClose(true);
      setTimerVal(value);
    }
  }

  const handleTradingStart = ({ type }) => {
    if (type === TRADING_START) {
      setTradingClose(false);
      setTimerVal(null);
    }
  }

  const wltBlnc = (data) => {
    setWlt(data);
  }

  return (
    <div className='trade-wrap-5m insta-an'>
      <div className='card-gr'>
        <WalletSummry wltBlnc={wltBlnc} />
      </div>
      <div className='card-yl'>
        <FiveMStockResult tradingClose={tradingClose} timerVal={timerVal} />
      </div>
      <div className='card-rd'>
        <FiveMTimer handleTradingClose={handleTradingClose} handleTradingStart={handleTradingStart} />
      </div>
      <div className='card-vl'>
        <FiveMStocks tradingClose={tradingClose} timerVal={timerVal} wlt={wlt} />
      </div>
      <div className='card-bl'>
        <Tabs>
          <TabList>
            <Tab>Investments</Tab>
            <Tab>Trade Records</Tab>
          </TabList>
          <TabPanel>
            <FiveMUserTradingData />
          </TabPanel>
          <TabPanel>
            <FiveMTradeRecords />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default FiveMTrading