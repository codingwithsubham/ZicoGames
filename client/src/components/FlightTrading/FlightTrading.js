import React, { useState } from 'react';
import WalletSummry from '../wallet/WalletSummry';
import FlightTimer from './FlightTimer';
import FlightStocks from './FlightStocks';
import { TRADING_CLOSE, TRADING_START } from '../../common/common';
import FlightTradeRecords from './FlightTradeRecords';
import FlightResult from './FlightResult';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FlightUserTradingData from './FlightUserTradingData';

const FlightTrading = () => {
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
    <div className='trade-wrap-flight insta-an'>
      <div className='card-gr'>
        <WalletSummry wltBlnc={wltBlnc} />
      </div>
      <div className='card-bl'>
        <FlightResult tradingClose={tradingClose} timerVal={timerVal} />
      </div>
      <div className='card-vl'>
        <FlightTimer handleTradingClose={handleTradingClose} handleTradingStart={handleTradingStart} />
      </div>
      <div className='card-rd'>
        <FlightStocks tradingClose={tradingClose} timerVal={timerVal} wlt={wlt} />
      </div>
      <div className='card-yl'>
        <Tabs>
          <TabList>
            <Tab>Your Bets</Tab>
            <Tab>Past Results</Tab>
          </TabList>
          <TabPanel>
            <FlightUserTradingData />
          </TabPanel>
          <TabPanel>
            <FlightTradeRecords />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default FlightTrading