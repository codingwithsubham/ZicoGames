import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingPage from "../components/layout/LoadingPage"

const AdminRoute = ({
  component: Component,
  socket,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !localStorage.token ? (
        <Redirect to='/' />
      ) : localStorage.token && loading ? (
        <LoadingPage />
      ) : user?.role === "admin" ? (
        <Component {...props} socket={socket} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
