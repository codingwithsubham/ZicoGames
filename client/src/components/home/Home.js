import React, { useState } from "react";
import ProductList from "./ProductList";
import UptimeCounter from "./UptimeCounter";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selfRegistration } from "../../actions/auth";
import RefferalBoard from "./RefferalBoard";

const Home = ({ auth: { user }, selfRegistration }) => {
  const [checked, setChecked] = useState(true);
  const handleSubmit = () => {
    if (checked) {
      selfRegistration();
      setChecked(!checked)
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
      <ProductList />
      <UptimeCounter />
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  selfRegistration: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  selfRegistration,
})(Home);
