import React, { Component } from "react";
import ArticlePost from "./ArticlePost";
import store from "../DataStore.js";
import { observer } from "mobx-react";
// import ArticleModal from "./ArticleModal";
// import { Modal } from "semantic-ui-react";
import "../Grid.css";

// import Axios from "axios";
// const filteredArticles = []

const ArticleContainer = observer(
  class ArticleContainer extends Component {
    // constructor(){
    //   super()
    //   this.state = {
    //     articles: []
    //   }
    // }
    // componentDidMount() {
    //   this.setState({
    //     articles:
    //   })
    // }

    render() {
      return (
        <div>
          {store.articles.filter(article => article.show !== false).map((article) => (
            <div key={article.id}>
              <ArticlePost
                article={article}
                clickHandler={this.props.openArticle}
                takeMeHome={this.props.takeMeHome}
                loggedInStatus={this.props.loggedInStatus}
              />
            </div>
          ))}
        </div>
      );
    }
  }
);

export default ArticleContainer;
