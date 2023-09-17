import React, { useEffect, useState } from "react";
import { getWltTot } from "../../actions/wallet";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TotalWalletTops = ({ getWltTot }) => {
  const [totBlnc, setTotWltBlnc] = useState(0);
  useEffect(() => {
    getWltTot().then((d) => setTotWltBlnc(d));
  }, [getWltTot]);

  return (
    <div className="tot-wlt-re">
      <div className="card-bl">
        <h1>Today Wallet Tops</h1>
        <div className="icn-bx">
          <i class="fa fa-star" aria-hidden="true"></i>
          <p>{totBlnc + 9530}+</p>
        </div>
      </div>
    </div>
  );
};

TotalWalletTops.propTypes = {
  getWltTot: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getWltTot,
})(TotalWalletTops);
