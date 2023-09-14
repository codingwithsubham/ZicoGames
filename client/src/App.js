import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import "./zLeagacyStyles/LeagecyStyles.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import BottomBar from "./components/layout/BottomBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import privacyPolicy from "./components/pages/privacyPolicy";
import Terms from "./components/pages/Terms";
import Aboutus from "./components/pages/Aboutus";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [width] = useWindowSize();

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {width <= 768 ? (
            <Fragment>
              <Navbar />
              <Sidebar />
              <BottomBar />
              <section className="container">
                <div className="main-content">
                  <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/privacy" component={privacyPolicy} />
                  <Route exact path="/terms" component={Terms} />
                  <Route exact path="/about" component={Aboutus} />
                  <Route path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                    <Route component={Routes} />
                  </Switch>
                </div>
                <Footer />
              </section>
            </Fragment>
          ) : (
            <div className="entire-Wrap">
              <div className="scrn-wrapper">
                <div className="smartphone">
                  <div className="content">
                    <iframe
                      title="app"
                      src={`${window.location.href}`}
                      style={{ width: "100%", border: "none", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
