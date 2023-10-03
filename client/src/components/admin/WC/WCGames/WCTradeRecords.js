import React from 'react';

const WCTradeRecords = ({ allGameUnits }) => {
  return (
    <div className="trd-rcrds">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Over</th>
            <th>Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {allGameUnits?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm?.over}</td>
              <td>
                Runs <br />
                Wickets <br />
                Chaukas <br />
                Chakkas <br />
              </td>
              <td>
                {itm?.evenOdd?.result} <br />
                {itm?.wicketorNo?.result} <br />
                {itm?.fourRuns?.result} <br />
                {itm?.sixRuns?.result} <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WCTradeRecords;
