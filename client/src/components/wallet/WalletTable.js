import React from "react";
import { CREDIT } from "../../common/common";

const WalletTable = ({ data }) => {
  return (
    <div className="tble-dta">
        <div className="tot-sum">
          <h4>Total Entry - {data?.length}</h4>
          <h4>
            Total {data && data[0]?.type} -{" "}
            {data?.length > 0 && data
              ?.map((item) => item.amnt)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}
          </h4>
      </div>
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Amnt</th>
            <th>Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((itm, idx) => (
            <tr
              key={idx}
              style={
                itm.type === CREDIT ? { color: "green" } : { color: "red" }
              }
            >
              <td>{itm.amnt}</td>
              <td>{itm.date}</td>
              <td>{itm.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTable;
