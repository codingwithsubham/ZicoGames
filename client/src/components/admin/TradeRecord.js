import React, { useState } from "react";
import ColorTrade from "./ColorTrade";

const TradeRecord = () => {
  const [option, setOption] = useState("");
  return (
    <div className="trde-rcrds-live">
      <div className="btn-grp">
        <button
          className={`btn ${option === "clr" ? "grn" : ""}`}
          onClick={() => setOption("clr")}
        >
          Color Trading
        </button>
        <button
          className={`btn ${option === "5m" ? "grn" : ""}`}
          onClick={() => setOption("5m")}
        >
          5m Trading
        </button>
      </div>
      <div className="trd-data">
        {option === "clr" && <ColorTrade />}
        {option === "5m" && <div />}
      </div>
    </div>
  );
};

export default TradeRecord;
