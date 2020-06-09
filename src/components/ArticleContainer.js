import React, { Component } from "react";
import ArticlePost from "./ArticlePost";
import store from "./DataStore.js";
import { observer } from "mobx-react";
// import Axios from "axios";

const ArticleContainer = observer(
  class ArticleContainer extends Component {
    render() {
      return (
        <div>
          {store.articles.map((article) => (
            <ArticlePost key={article.id} article={article} />
          ))}
        </div>
      );
    }
  }
);

export default ArticleContainer;
