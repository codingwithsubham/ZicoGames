import React, { useState } from "react";
import CompletePayment from "./CompletePayment";

const WalletTopup = () => {
  const amnts = [
    300, 500, 1000, 1500, 2000, 2500, 5000, 7500, 10000, 15000, 20000,
  ];
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    setSelected(null);
  }

  return (
    <div className="wlt-tpup">
      {!selected ? (
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
                onClick={() => setSelected(itm)}
              >
                {itm}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CompletePayment selected={selected} handleClose={handleClose} />
      )}
    </div>
  );
};

export default WalletTopup;