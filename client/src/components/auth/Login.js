import React, { useState, Fragment, useEffect } from "react";
import { loadUser, login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = ({
  loadUser,
  login,
  auth: { user, isAuthenticated, error },
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [openLogin, setOpenLogin] = useState(false);
  let dt = new Date();

  const loginToPortal = () => {
    setOpenLogin(true);
  };

  const [formdata, setFormdata] = useState({
    mobile: "",
    password: "",
  });

  const [type, SetType] = useState(false);

  const { mobile, password } = formdata;

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile && password) {
      login(formdata);
    }
  };


  if (user && isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login-wrapper">
      {openLogin ? (
        <Fragment>
          <div className="login-screen">
            <div className="bg-login" />
            <div className="lgin-frm">
              <div className="title">Login</div>
              <div className="subtitle">Use your Zico Account to Login</div>
              <form className="login-form insta-an" onSubmit={(e) => handleSubmit(e)}>
                {error &&
                  error.map((itm) => (
                    <div key={itm} className="error insta-slide">
                      {itm.msg} !! Please Enter Again !!
                    </div>
                  ))}
                <div className="inpt-group">
                  <label>Ph Number</label>
                  <input
                    id="mobile"
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inpt-group">
                  <label>Password</label>
                  <input
                    id="password"
                    type={type ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                  <i className="fa fa-eye" onClick={() => SetType(!type)} ></i>
                </div>
                <button className="btn big">Sign in</button>
              </form>
              <div className="footer-text">
                Copyright© {dt.getFullYear()} Zico Games.
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="welcome-screen">
            <div className="bg-login" />
            <div className="welcome-texts insta-an">
              <img src={require("../../static/3.png")} alt="" className="wl-icn" />
              <div className="pre-title">Welcome to,</div>
              <div className="title">Zico Games</div>
              <div className="subtitle">Play & Win</div>
              <div className="welcome-buttons">
                <button className="btn big" onClick={() => loginToPortal()}>
                  Proceed
                </button>
              </div>
              <div className="helper-texts">
                Forgot Password ? <a href="/forgot-password">Click here</a> to Reset Password.
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
  login,
})(Login);