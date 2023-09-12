import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Link, useLocation } from "react-router-dom";
import { closeSidebar, openSidebar } from "../../actions/layout";

const Navbar = ({
  auth: { isAuthenticated, user, cnfData },
  layout: { isSidebarOpen },
  logout,
  openSidebar,
  closeSidebar,
}) => {
  const [navStyle, setNavStyle] = useState("");
  const listenScrollEvent = (e) => {
    if (window.scrollY > 1) {
      setNavStyle("stickey");
    } else {
      setNavStyle("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  const location = useLocation();
  let pathname = location.pathname;
  let rawPath = pathname.split("/")[1];
  
  return (
    isAuthenticated &&
    user && (
      <div
        id="myNavbar"
        className={`navbar ${navStyle}`}
        style={isSidebarOpen ? { marginLeft: "20%" } : { marginLeft: "0%" }}
      >
        <div className="nav-left">
          <div className="menu">
            <button
              className="closebtn"
              style={isSidebarOpen ? { right: "-25px" } : { right: "-55px" }}
              onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
            >
              {isSidebarOpen ? "×" : "☰"}
            </button>
          </div>
          <div className="logo">
            {rawPath === "home" ? (
              navStyle === "" ? (
                <div className="welcome insta-slide-down">
                  <div className="nm">
                    Hello {user?.name?.split(" ")[0]}{" "}
                    <span
                      style={{
                        backgroundColor:
                        cnfData?.status ? "green" : "red",
                      }}
                    >
                      {cnfData?.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                  Welcome Back!
                </div>
              ) : (
                <h1 className="insta-slide-up">CnF</h1>
              )
            ) : (
              <div style={{ textTransform: "uppercase" }}>{rawPath}</div>
            )}
          </div>
        </div>
        <div className="nav-right">
          <Link to="/wallet" className="user notification wlt">
            <i className="fa fa-money" aria-hidden="true"></i>
            {/* {wallet ? wallet.wallet : 0} */}
            1000
          </Link>
          <div className="user notification">
            <i className="fa fa-bell" aria-hidden="true"></i>
            <div className="dropdown-content">
              <div className="notification">
                <div className="notification-item">It's a Notification</div>
                <div className="notification-item">It's a Notification</div>
                <div className="notification-item">It's a Notification</div>
              </div>
            </div>
          </div>
          <div className="user">
            <i className="fa fa-user" aria-hidden="true"></i>
            <div className="dropdown-content">
              <p onClick={() => logout()}>Logout</p>
              <Link to="/reset-password">
                Reset Password
              </Link>
              <Link to="/profile">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, {
  logout,
  closeSidebar,
  openSidebar,
})(Navbar);
