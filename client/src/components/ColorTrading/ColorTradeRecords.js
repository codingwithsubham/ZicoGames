import React, { useEffect } from "react";
import { getTradeRecords } from "../../actions/colorTrade";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ColorTradeRecords = ({ colorTrade: { allTrdData }, getTradeRecords }) => {
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
              <td>Color</td>
              <td className="clr-icn-data">
                {itm.result}
                <div 
                  className="clr-icn"
                  style={
                    itm.result === "red"
                      ? { backgroundColor: "#e63d31" }
                      : itm.result === "yellow"
                      ? { backgroundColor: "#ffeb3b" }
                      : itm.result === "green"
                      ? { backgroundColor: "#49aa4d" }
                      : { backgroundColor: "#fff"}
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ColorTradeRecords.propTypes = {
  getTradeRecords: PropTypes.func.isRequired,
  colorTrade: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colorTrade: state.colorTrade,
});

export default connect(mapStateToProps, {
  getTradeRecords,
})(ColorTradeRecords);
