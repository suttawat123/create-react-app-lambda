import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ContextProvider } from "./context";
import FullLayout from "./layouts/fullLayout";
import Login from "./views/Login/index";
import { isLogin } from "./services/Helpers/securityGuard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  componentDidMount = () => {
    isLogin();
  };

  componentDidUpdate = () => {
    isLogin();
  };

  render() {
    return (
      <ContextProvider app={this}>
        <BrowserRouter>
          <Switch>
            {isLogin() ? (
              <Route
                // exact
                path={"/"}
                name={"Home"}
                render={(props) => <FullLayout {...props} />}
              />
            ) : (
              <Route
                exact
                path={"/"}
                name={"Login"}
                render={(props) => <Login {...props} />}
              />
            )}
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  Routes: state.Routes,
});

export default connect(mapStateToProps)(App);
