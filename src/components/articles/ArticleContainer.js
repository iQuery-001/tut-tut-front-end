import React, { Component } from "react";
import ArticlePost from "./ArticlePost";
import store from "../DataStore.js";
import { observer } from "mobx-react";
// import ArticleModal from "./ArticleModal";
// import { Modal } from "semantic-ui-react";

// import Axios from "axios";

const ArticleContainer = observer(
  class ArticleContainer extends Component {
    render() {
      return (
        <React.Fragment>
          {store.articles.map((article) => (
            <div key={article.id}>
              <ArticlePost
                article={article}
                clickHandler={this.props.openArticle}
                takeMeHome={this.props.takeMeHome}
                loggedInStatus={this.props.loggedInStatus}
              />
            </div>
          ))}
        </React.Fragment>
      );
    }
  }
);

export default ArticleContainer;
