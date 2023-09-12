import React, { useState } from 'react';
import WalletSummry from '../wallet/WalletSummry';
import ColorTimer from './ColorTimer';
import ColorStocks from './ColorStocks';
import { TRADING_CLOSE, TRADING_START } from '../../common/common';
import ColorTradeRecords from './ColorTradeRecords';
import ColorResult from './ColorResult';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ColorUserTradingData from './ColorUserTradingData';

const ColorTrading = () => {
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
    <div className='trade-wrap-clr insta-an'>
      <div className='card-gr'>
        <WalletSummry wltBlnc={wltBlnc} />
      </div>
      <div className='card-bl'>
        <ColorResult tradingClose={tradingClose} timerVal={timerVal} />
      </div>
      <div className='card-vl'>
        <ColorTimer handleTradingClose={handleTradingClose} handleTradingStart={handleTradingStart} />
      </div>
      <div className='card-rd'>
        <ColorStocks tradingClose={tradingClose} timerVal={timerVal} wlt={wlt} />
      </div>
      <div className='card-yl'>
        <Tabs>
          <TabList>
            <Tab>Investments</Tab>
            <Tab>Trade Records</Tab>
          </TabList>
          <TabPanel>
            <ColorUserTradingData />
          </TabPanel>
          <TabPanel>
            <ColorTradeRecords />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default ColorTrading