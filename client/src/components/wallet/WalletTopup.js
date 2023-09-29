import React, { useState } from "react";
import PaymentGateway from "../paymentGateway/PaymentGateway";
//import CompletePayment from "./CompletePayment";

const WalletTopup = () => {
  const amnts = [
    1, 300, 500, 1000, 1500, 2000, 2500, 5000, 7500, 10000, 15000, 20000,
  ];
  const [selected, setSelected] = useState(null);
  const [openPG, setOpenPG] = useState(false);
  
  const handleClose = () => {
    setSelected(null);
    setOpenPG(false);
  }

  const handleSelected = (itm) => {
    setSelected(itm);
    setOpenPG(true);
  }

  return (
    <div className="wlt-tpup">
       <div className="amnt">
          <div className="img-flbak">
            <img src={require("../../static/waltanim.gif")} alt="" />
          </div>
          <h1>Choose amount you want to add to your Trading Vault</h1>
          <div className="tpup-opts">
            {amnts.map((itm, idx) => (
              <div
                className="tpup-itms"
                key={idx}
                onClick={() => handleSelected(itm)}
              >
                {itm}
              </div>
            ))}
          </div>
        </div>
        {openPG && (
        <PaymentGateway
          openPG={openPG}
          amnt={parseInt(selected)}
          type={'WC'}
          handleClose={handleClose}
        />
      )}
      {/* {!selected ? (
        <div className="amnt">
          <div className="img-flbak">
            <img src={require("../../static/waltanim.gif")} alt="" />
          </div>
          <h1>Choose amount you want to add to your Trading Vault</h1>
          <div className="tpup-opts">
            {amnts.map((itm, idx) => (
              <div
                className="tpup-itms"
                key={idx}
                onClick={() => handleSelected(itm)}
              >
                {itm}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CompletePayment selected={selected} handleClose={handleClose} />
      )} */}
    </div>
  );
};

export default WalletTopup;