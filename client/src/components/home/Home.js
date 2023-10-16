import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import UptimeCounter from './UptimeCounter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selfRegistration } from '../../actions/auth';
import { getAllTradingData } from '../../actions/userTrading';
import RefferalBoard from './RefferalBoard';
import LiveTradeRecords from './LiveTradeRecords';
import { showulDisplay } from '../../common/functions';
import QuickAccess from './QuickAccess';
import TotalWalletTops from './TotalWalletTops';

const Home = ({
  auth: { user, allTimeTrade },
  selfRegistration,
  getAllTradingData,
}) => {
  useEffect(() => {
    getAllTradingData();
  }, [getAllTradingData]);

  const display = showulDisplay();
  const [checked, setChecked] = useState(true);
  const handleSubmit = () => {
    if (checked) {
      selfRegistration();
      setChecked(!checked);
    }
  };

  return !user?.legacyid ? (
    <div className="hme-wrap insta-an">
      <div className="dclr-frm">
        <div className="dclr">
          I hereby declare that I'm registering myself to CnF Trading Platform,
          completely on my full attendence and informations given are correct
          and complete to the best of my belief and knowledge.
        </div>
        <div className="chkbx">
          <input
            type="checkbox"
            value={checked}
            defaultChecked
            onChange={() => setChecked(!checked)}
          />
          <p>I Agree</p>
        </div>
        <button className="btn" onClick={() => handleSubmit()}>
          Register Myself
        </button>
      </div>
    </div>
  ) : (
    <div className="hme-wrap insta-an">
      <RefferalBoard />
      {!display ? <ProductList /> : <QuickAccess />}
      <UptimeCounter />
      {display && <TotalWalletTops />}
      <LiveTradeRecords data={allTimeTrade} />
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  selfRegistration: PropTypes.func.isRequired,
  getAllTradingData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  selfRegistration,
  getAllTradingData,
})(Home);
