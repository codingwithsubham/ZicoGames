import React, { useEffect, useRef } from "react";
import {
  apprvWithdrawlRequest,
  getPendingWithdrawlRequest,
  dclineWithdrawlRequest,
} from "../../actions/admin";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";

const ApproveWithdrawlRequest = ({
  apprvWithdrawlRequest,
  getPendingWithdrawlRequest,
  dclineWithdrawlRequest,
  withdrwlReq: { withdrwlreqs },
}) => {
  useEffect(() => {
    getPendingWithdrawlRequest();
  }, [getPendingWithdrawlRequest]);
  const tableRef = useRef(null);
  
  return (
    <div className="admn-wrpr">
      <h1>Approve Payment Request</h1>
      <DownloadTableExcel
          filename={`payout ${new Date()}`}
          sheet="payouts"
          currentTableRef={tableRef.current}
        >
          <button className="btn export-xl"> Export excel </button>
        </DownloadTableExcel>
      <table className="trd-rcrds-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Date</th>
            <th>Status</th>
            <th>Holder Name</th>
            <th>AC Number</th>
            <th>IFSC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrwlreqs?.map((itm, idx) => (
            <tr key={idx}>
              <td>{itm.blnc}</td>
              <td>{itm.date}</td>
              <td>{itm.status}</td>
              <td>{itm?.bankDetails?.bankingName}</td>
              <td>{itm?.bankDetails?.acNumber}</td>
              <td>{itm?.bankDetails?.ifscCode}</td>
              <td>
                <div className="btn-grp vt">
                <button
                  className="btn grn"
                  onClick={() => apprvWithdrawlRequest({ id: itm._id })}
                >
                  ✔
                </button>
                <button
                  className="btn rd"
                  onClick={() => dclineWithdrawlRequest({ id: itm._id })}
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

ApproveWithdrawlRequest.propTypes = {
  apprvWithdrawlRequest: PropTypes.func.isRequired,
  dclineWithdrawlRequest: PropTypes.func.isRequired,
  getPendingWithdrawlRequest: PropTypes.func.isRequired,
  withdrwlReq: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  withdrwlReq: state.withdrwlReq,
});

export default connect(mapStateToProps, {
  apprvWithdrawlRequest,
  getPendingWithdrawlRequest,
  dclineWithdrawlRequest,
})(ApproveWithdrawlRequest);
