import React from "react";
import ArticleContainer from "./ArticleContainer";
import store from "../DataStore.js";
import { observer } from "mobx-react";
// import Axios from "axios";
import CreateArticle from "./CreateArticle";

const Articles = observer(
  class Articles extends React.Component {
    // populateStore = () => {
    //   Axios.get("http://localhost:3001/articles").then((articles) => {
    //     store.articles = articles.data;
    //     // console.log(store.articles);
    //   });
    // };

    // componentDidMount() {
    //   this.populateStore();
    // }

    getNewArticles = (response) => {
      store.articles = [response, ...store.articles];
    };

    render() {
      // console.log(this.props.store)
      return (
        <div>
          {this.props.loggedInStatus === "LOGGED_IN" ? (
            <CreateArticle
              user={this.props.user}
              history={this.props.pushToRoute}
              getNewArticles={this.getNewArticles}
            />
          ) : null}

          <ArticleContainer
            loggedInStatus={this.props.loggedInStatus}
            user={this.props.user}
            openArticle={this.props.openArticle}
            takeMeHome={this.props.takeMeHome}
          />
        </div>
      );
    }
  }
);

export default Articles;
