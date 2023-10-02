import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingPage from "../components/layout/LoadingPage"

const PrivateRoute = ({
  component: Component,
  socket,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !localStorage.token? (
        <Redirect to='/' />
      ) : localStorage.token && loading ? (
        <LoadingPage />
      ) : (
        <Component {...props} socket={socket}/>
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
