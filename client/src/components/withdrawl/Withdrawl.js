import React from "react";
import WalletSummry from "../wallet/WalletSummry";
import WithdrawlReqs from "./WithdrawlReqs";


const Withdrawl = () => {
    const wltBlnc = () => {
        //do nothing
    };
    return (
        <div className="wlt-wrp insta-an">
            <div className="card-gr">
                <WalletSummry wltBlnc={wltBlnc} />
            </div>
            <div className='card-bl'>
                <WithdrawlReqs />
            </div>
        </div>
    );
};

export default Withdrawl;
