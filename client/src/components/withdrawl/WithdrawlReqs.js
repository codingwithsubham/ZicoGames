import React, { useEffect } from "react";
import {
  getWithdrawlRequestsByUser,
} from "../../actions/withdrwl";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const WithdrawlReqs = ({
  getWithdrawlRequestsByUser,
  withdrwlReq: { withdrwlreqs },
}) => {
  useEffect(() => {
    getWithdrawlRequestsByUser();
  }, [getWithdrawlRequestsByUser]);

  return (
    <div className="admn-wrpr">
      <table className="trd-rcrds-table">
        <thead>
          <tr>
            <th>Balance</th>
            <th>Date</th>
            <th>Status</th>
            <th>Holder Name</th>
            <th>AC Number</th>
            <th>IFSC</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

WithdrawlReqs.propTypes = {
  getWithdrawlRequestsByUser: PropTypes.func.isRequired,
  withdrwlReq: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  withdrwlReq: state.withdrwlReq,
});

export default connect(mapStateToProps, {
  getWithdrawlRequestsByUser,
})(WithdrawlReqs);
