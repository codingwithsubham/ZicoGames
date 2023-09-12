import React, { useState, useLayoutEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeSidebar, openSidebar } from "../../actions/layout";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Sidebar = ({
  auth: { isAuthenticated, user },
  layout: { isSidebarOpen },
  closeSidebar,
}) => {
  const [width] = useWindowSize();
  return (
    isAuthenticated &&
    user && (
      <div
        id="mySidebar"
        className="sidebar"
        style={
          isSidebarOpen
            ? { width: width <= 600 ? "60%" : "20%" }
            : { width: "0%" }
        }
      >
        <div className="sidebar-content">
          {width <= 600 && (
            <button className="sidebar-closebtn" onClick={() => closeSidebar()}>
              x
            </button>
          )}
          <div className="sidebar-header">
            <div className="title">
              <p>CnF</p>
            </div>
          </div>
          <div className="sidebar-links">
            {user?.role === "admin" ? (
              <Fragment>
                <NavLink exact to="/tp-up-aprv" onClick={() => closeSidebar()}>
                  Approve Topups
                </NavLink>
                <NavLink
                  exact
                  to="/wth-dwl-aprv"
                  onClick={() => closeSidebar()}
                >
                  Approve Withdrawls
                </NavLink>
                <NavLink exact to="/trd-live" onClick={() => closeSidebar()}>
                  Trade Live
                </NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink exact to="/home" onClick={() => closeSidebar()}>
                  Home
                </NavLink>
                <NavLink exact to="/wallet" onClick={() => closeSidebar()}>
                  Wallet
                </NavLink>
                <NavLink exact to="/withdrawl" onClick={() => closeSidebar()}>
                  Withdrawl
                </NavLink>
              </Fragment>
            )}
            <a href="https://easyachieve.co.in/" onClick={() => closeSidebar()}>
              Easy Achieve
            </a>
          </div>
        </div>
      </div>
    )
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, { closeSidebar, openSidebar })(Sidebar);
