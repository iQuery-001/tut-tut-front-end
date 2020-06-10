import React, { Component } from "react";
// import ArticlePost from "./ArticlePost";
import store from "../DataStore.js";
import { observer } from "mobx-react";
import ArticleModal from "./ArticleModal";
// import Axios from "axios";

const ArticleContainer = observer(
  class ArticleContainer extends Component {
    render() {
      return (
        <div>
          {store.articles.map((article) => (
            <ArticleModal key={article.id} article={article}/>
          ))}
        </div>
      );
    }
  }
);

export default ArticleContainer;
