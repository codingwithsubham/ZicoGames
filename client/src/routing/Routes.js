import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/layout/NotFound";
import Alert from "../components/layout/Alert"
import ScrollToTop from "../ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/home/Home";
import FiveMTrading from "../components/FiveMTrading/FiveMTrading";
import FlightTrading from "../components/FlightTrading/FlightTrading";
import WalletTopup from "../components/wallet/WalletTopup";
import ApproveTopupRequest from "../components/admin/ApproveTopupRequest";
import Wallet from "../components/wallet/Wallet";
import ColorTrading from "../components/ColorTrading/ColorTrading";
import Withdrawl from "../components/withdrawl/Withdrawl";
import SubmitWithdrawlReq from "../components/withdrawl/SubmitWithdrawlReq";
import ApproveWithdrawlRequest from "../components/admin/ApproveWithdrawlRequest";
import TradeRecord from "../components/admin/TradeRecord";
import Register from "../components/auth/Register";
import ResetPassword from "../components/auth/ResetPassword";
import { showulDisplay } from "../common/functions";
import Profile from "../components/profile/Profile";
import AdminRoute from "./AdminRoute";
import Users from "../components/admin/Users";
import { io } from "socket.io-client";
import WorldCupGames from "../components/WCTrading/WorldCupGames";

const Routes = ({ layout: { isSidebarOpen }}) => {
  const socket = io(['https://zicogames.onrender.com/', 'http://localhost:8081'], {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
  const display = showulDisplay();
  return (
    <div
      id="main"
      style={isSidebarOpen ? { marginLeft: "20%" } : { marginLeft: "0%" }}
    >
      <Alert />
      <ScrollToTop />
      <Switch>
        <Route exact path="/register/refferal/:id" component={Register} />
        <PrivateRoute exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/5m-trading" component={FiveMTrading} />
        <PrivateRoute exact path="/color-trading" component={ColorTrading} />
        <PrivateRoute exact path="/flight-trading" component={FlightTrading} />
        <PrivateRoute exact path="/wallet" component={Wallet} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/world-cup-game" component={WorldCupGames} socket={socket} />
        <AdminRoute exact path="/trd-live" component={TradeRecord} />
        <AdminRoute exact path="/users" component={Users} />
        <AdminRoute exact path="/tp-up-aprv" component={ApproveTopupRequest} />
        <AdminRoute exact path="/wth-dwl-aprv" component={ApproveWithdrawlRequest} />
        {
          display && <Fragment>
            <PrivateRoute exact path="/wallet-top-up" component={WalletTopup} />
            <PrivateRoute exact path="/withdrawl" component={Withdrawl} />
            <PrivateRoute exact path="/submit-withdrawl/:blnc" component={SubmitWithdrawlReq} />
          </Fragment>
        }
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  layout: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  layout: state.layout,
});

export default connect(mapStateToProps, {})(Routes);
