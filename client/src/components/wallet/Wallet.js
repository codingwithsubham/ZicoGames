import React, { useState } from "react";
import WalletSummry from "./WalletSummry";
import { CREDIT } from "../../common/common";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WalletTable from "./WalletTable";

const Wallet = () => {
  const [wlt, setWlt] = useState(null);
  const wltBlnc = (data) => {
    setWlt(data);
  };
  
  return (
    <div className="wlt-wrp insta-an">
      <div className="card-gr">
        <WalletSummry wltBlnc={wltBlnc} />
      </div>
      <div className='card-bl'>
        <Tabs>
          <TabList>
            <Tab>Credit</Tab>
            <Tab>Debit</Tab>
          </TabList>
          <TabPanel>
            <WalletTable data={wlt?.history?.filter(x => x.type === CREDIT)} />
          </TabPanel>
          <TabPanel>
            <WalletTable data={wlt?.history?.filter(x => x.type !== CREDIT)} />
          </TabPanel>
        </Tabs>
      </div>

    </div>
  );
};

export default Wallet;
