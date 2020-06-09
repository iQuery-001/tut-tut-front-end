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
      store: {
        users: [],
        articles: [],
        comments: [],
      },
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

  populateStore = () => {
    // Axios.get("http://localhost:3001/users")
    // //   .then((res) => res.json())
    //   .then((users) =>
    //     this.setState({
    //       ...this.state,
    //       store: {
    //         users: users,
    //       },
    //     })
    //   );
    Axios.get("http://localhost:3001/articles")
    //   .then((res) => console.log(res))
      .then((articles) =>
        this.setState({
          ...this.state,
          store: {
            articles: articles.data,
          },
        })
      );
    // Axios.get("http://localhost:3001/comments")
    // //   .then((res) => res.json())
    //   .then((comments) =>
    //     this.setState({
    //       ...this.state,
    //       store: {
    //         comments: comments,
    //       },
    //     })
    //   );

    //   this.setState({...this.state, store: {
    //       users: users,
    //       articles: articles,
    //       comments: comments
    //   }})
  };

  componentDidMount() {
    // console.log(this.props);
    this.checkLoginStatus();
    this.populateStore();
  }

  handleSuccessfulAuth = (data) => {
    this.handleLogin(data);
    history.push("/");
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
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          handleLogout={this.handleLogout}
          user={this.state.user}
        />

        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Articles
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                  store={this.state.store}
                />
              )}
            ></Route>
            <Route
              exact
              path={`/users/bio`}
              render={(props) => (
                <UserBio
                  {...props}
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
