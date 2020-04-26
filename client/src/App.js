import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import Submissions from "./Components/pages/Submission";
import Navbar from "./Components/layout/Navbar";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Alerts from "./Components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./Components//routing/PrivateRoute";
import ViewSubmissions from "./Components/pages/ViewSubmissions";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute
                    exact
                    path="/submission"
                    component={Submissions}
                  />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
