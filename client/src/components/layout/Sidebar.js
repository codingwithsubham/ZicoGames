import React, { useState, useLayoutEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { closeSidebar, openSidebar } from '../../actions/layout';
import { showulDisplay } from '../../common/functions';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Sidebar = ({
  auth: { isAuthenticated, user },
  layout: { isSidebarOpen },
  closeSidebar,
}) => {
  const [width] = useWindowSize();
  const display = showulDisplay();
  return (
    isAuthenticated &&
    user && (
      <div
        id="mySidebar"
        className="sidebar"
        style={
          isSidebarOpen
            ? { width: width <= 600 ? '60%' : '20%' }
            : { width: '0%' }
        }
      >
        {isSidebarOpen && (
          <div className="sidebar-bg" onClick={() => closeSidebar()} />
        )}
        <div className="sidebar-content">
          {width <= 600 && (
            <button className="sidebar-closebtn" onClick={() => closeSidebar()}>
              x
            </button>
          )}
          <div className="sidebar-header">
            <div className="title">
              <p>Zico</p>
            </div>
          </div>
          <div className="sidebar-links">
            <Fragment>
              <NavLink exact to="/home" onClick={() => closeSidebar()}>
                Home
              </NavLink>
              {user?.role === 'admin' && (
                <Fragment>
                  <NavLink
                    exact
                    to="/tp-up-aprv"
                    onClick={() => closeSidebar()}
                  >
                    Approve Topup
                  </NavLink>
                  <NavLink
                    exact
                    to="/wth-dwl-aprv"
                    onClick={() => closeSidebar()}
                  >
                    Approve Withdrawls
                  </NavLink>
                  <NavLink exact to="/trd-live" onClick={() => closeSidebar()}>
                    Live Game
                  </NavLink>
                  <NavLink exact to="/users" onClick={() => closeSidebar()}>
                    Users Details
                  </NavLink>
                </Fragment>
              )}
              <NavLink exact to="/wallet" onClick={() => closeSidebar()}>
                Wallet
              </NavLink>
              {display && (
                <NavLink exact to="/withdrawl" onClick={() => closeSidebar()}>
                  Withdrawl
                </NavLink>
              )}
              <NavLink exact to="/privacy" onClick={() => closeSidebar()}>
                Privacy Policy
              </NavLink>
              <NavLink exact to="/terms" onClick={() => closeSidebar()}>
                Terms of Use
              </NavLink>
              <NavLink exact to="/about" onClick={() => closeSidebar()}>
                About Us
              </NavLink>
            </Fragment>
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
