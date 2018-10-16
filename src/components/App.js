import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignUpPage from "./SignUp";
import SignInPage from "./SignIn";
import PasswordForgetPage from "./PasswordForget";
import HomePage from "./Home";
import AccountPage from "./Account";


import * as routes from "../constants/routes";
import withAuthentication from "./withAuthentication";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#00796B',
      light: '#B2DFDB',
      main: '#009688',
      contrastText: '#FFF',
      textPrimary: '#212121',

    },
    secondary: {
      main: '#00a0b2',
      contrastText: '#fff',
      secondaryText: '#757575'
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <div>
              <Navigation />
              <div style={{marginTop:64}}>
                <Route exact path={routes.LANDING} component={LandingPage} />
                <Route exact path={routes.SIGN_UP} component={SignUpPage} />
                <Route exact path={routes.SIGN_IN} component={SignInPage} />
                <Route
                  exact
                  path={routes.PASSWORD_FORGET}
                  component={PasswordForgetPage}
                />
                <Route exact path={routes.HOME} component={HomePage} />
                <Route exact path={routes.ACCOUNT} component={AccountPage} />
              </div>
            </div>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
