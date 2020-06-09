import React, { Component } from "react";
import Nav from "./Nav";
import { Router, Switch, Route } from "react-router-dom";
import Articles from "./Articles";
import UserBio from "./UserBio";
import Axios from "axios";
import { createBrowserHistory } from "history";
// import { observer } from 'mobx-react'
// import store from "./DataStore";

const history = createBrowserHistory();

// const Home = observer(
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    //   store: {
    //     users: [],
    //     articles: [],
    //     comments: [],
    //   },
    };
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
    Axios.delete("http://localhost:3001/logout", {
      withCredentials: true,
    }).catch((error) => {
      console.log("Errors: ", error);
    });
  };

  componentDidMount() {
    // console.log(this.props);
    this.checkLoginStatus();
  }

  handleSuccessfulAuth = (data) => {
    this.handleLogin(data);
    // history.push("/");
  };

  checkLoginStatus = () => {
    Axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (
          res.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user,
          });
        } else if (
          !res.data.loggedIn &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
        // console.log(res)
      })
      .catch((error) => {
        console.log("Check login error: ", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          handleLogout={this.handleLogout}
          user={this.state.user}
        />
        <br></br>
        <br></br>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Articles
                //   {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                //   store={this.state.store}
                />
              )}
            ></Route>
            <Route
              exact
              path={`/users/bio`}
              render={(props) => (
                <UserBio
                //   {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            ></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
// );

export default Home;
