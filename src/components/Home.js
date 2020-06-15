import React, { Component } from "react";
import Nav from "./Nav";
import { Router, Switch, Route } from "react-router-dom";
import Articles from "./articles/Articles";
import ArticlePost from "./articles/ArticlePost";
import Axios from "axios";
import { createBrowserHistory } from "history";
// import ArticleModal from "./articles/ArticleModal";
import { observer } from "mobx-react";
import store from "./DataStore";
import './Grid.css'
import "semantic-ui-css/semantic.min.css";

const history = createBrowserHistory();

const Home = observer(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedInStatus: "NOT_LOGGED_IN",
        user: {},
        currentArticleID: 0,
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
      Axios.get("http://localhost:3001/articles").then((articles) => {
        store.articles = articles.data;
        // console.log(store.articles);
      });
    };

    componentDidMount() {
      // console.log(this.props);
      this.checkLoginStatus();
      this.populateStore();
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

    openArticle = (article) => {
      //   console.log(article.id)
      this.setState({
        currentArticleID: article.id,
      });
      history.push(`/articles/${article.id}`);
    };

    takeMeHome = () => {
      history.push("/");
    };

    render() {
      return (
        <div className="grid-container">
          <Nav
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
          {/* <ArticleModal article={{url: "blah"}}/> */}
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Articles
                    loggedInStatus={this.state.loggedInStatus}
                    user={this.state.user}
                    history={history}
                    openArticle={this.openArticle}
                  />
                )}
              ></Route>
              <Route exact path={`/articles/${this.state.currentArticleID}`}>
                <ArticlePost
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                  article={store.articles.find(
                    (article) => article.id === this.state.currentArticleID
                  )}
                  individualPost={true}
                  clickHandler={this.takeMeHome}
                ></ArticlePost>
              </Route>
            </Switch>
          </Router>
        </div>
      );
    }
  }
);

export default Home;
