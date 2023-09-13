import React, { useEffect } from "react";
import { getTradeRecords } from "../../actions/flightTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const FlightTradeRecords = ({ flightTrade: { allTrdData }, getTradeRecords }) => {
  useEffect(() => {
    getTradeRecords();
  }, [getTradeRecords]);

  return (
    <div className="trd-rcrds">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Trde ID</th>
            <th>Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {allTrdData?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm?._id?.toString().substring(0,8)}</td>
              <td>Patang-Baz</td>
              <td className="clr-icn-data">
                {itm.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

FlightTradeRecords.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  flightTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  flightTrade: state.flightTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(FlightTradeRecords);
