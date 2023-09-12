import React, { useEffect } from "react";
import {
  apprvTopUpRequest,
  getPendingTopUpRequest,
  dclineTopUpRequest,
} from "../../actions/admin";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ApproveTopupRequest = ({
  apprvTopUpRequest,
  getPendingTopUpRequest,
  dclineTopUpRequest,
  tpupreq: { tpupreqs },
}) => {
  useEffect(() => {
    getPendingTopUpRequest();
  }, [getPendingTopUpRequest]);

  return (
    <div className="admn-wrpr">
      <h1>Approve Payment Request</h1>
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>UTR</th>
            <th>Balance</th>
            <th>Name (CnF) </th>
            <th>Mobile (CnF) </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tpupreqs?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm.date}</td>
              <td>{itm.utr}</td>
              <td>{itm.blnc}</td>
              <td>{itm?.userData?.name}</td>
              <td>{itm?.userData?.mobile}</td>
              <td>
                <div className="btn-grp vt">
                  <button
                    className="btn grn"
                    onClick={() => apprvTopUpRequest({ id: itm._id })}
                  >
                    ✔
                  </button>
                  <button
                    className="btn rd"
                    onClick={() => dclineTopUpRequest({ id: itm._id })}
                  >
                    X
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ApproveTopupRequest.propTypes = {
  apprvTopUpRequest: PropTypes.func.isRequired,
  dclineTopUpRequest: PropTypes.func.isRequired,
  getPendingTopUpRequest: PropTypes.func.isRequired,
  tpupreqs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tpupreq: state.tpupreq,
});

export default connect(mapStateToProps, {
  apprvTopUpRequest,
  getPendingTopUpRequest,
  dclineTopUpRequest,
})(ApproveTopupRequest);
