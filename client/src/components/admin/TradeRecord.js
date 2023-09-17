import React, { useState } from "react";
import ColorTrade from "./ColorTrade";
import FlightTrade from "./FlightTrade";
import FiveMTrade from "./FiveMTrade";

const TradeRecord = () => {
  const [option, setOption] = useState("");
  return (
    <div className="trde-rcrds-live">
      <div className="btn-grp">
        <button
          className={`btn ${option === "clr" ? "grn" : ""}`}
          onClick={() => setOption("clr")}
        >
          RB - 1m
        </button>
        <button
          className={`btn ${option === "flt" ? "grn" : ""}`}
          onClick={() => setOption("flt")}
        >
          PB - 2m
        </button>
        <button
          className={`btn ${option === "5m" ? "grn" : ""}`}
          onClick={() => setOption("5m")}
        >
          12k9 - 3m
        </button>
      </div>
      <div className="trd-data">
        {option === "clr" && <ColorTrade />}
        {option === "flt" && <FlightTrade />}
        {option === "5m" && <FiveMTrade />}
      </div>
    </div>
  );
};

export default TradeRecord;
