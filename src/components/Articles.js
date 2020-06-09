import React from "react";
import ArticleContainer from "./ArticleContainer";
import store from "./DataStore.js";
import { observer } from "mobx-react";
import Axios from "axios";
import CreateArticle from "./CreateArticle";

const Articles = observer(
  class Articles extends React.Component {
    populateStore = () => {
      Axios.get("http://localhost:3001/articles").then(
        (articles) => {
            store.articles = articles.data
            console.log(store.articles)
        }
      );
    };

    componentDidMount() {
      this.populateStore();
    }
    render() {
      // console.log(this.props.store)
      return (
        <div>
          <CreateArticle user={this.props.user} />
          <ArticleContainer user={this.props.user}/>
        </div>
      );
    }
  }
);

export default Articles;
