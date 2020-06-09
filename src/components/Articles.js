import React from "react";
import ArticleContainer from "./ArticleContainer";
import store from "./DataStore.js";
import { observer } from 'mobx-react'
import Axios from "axios";

const Articles = observer(
  class Articles extends React.Component {
    populateStore = () => {
      Axios.get("http://localhost:3001/articles").then(
        (articles) => (store.articles = articles.data)
      );
    };

    componentDidMount() {
      this.populateStore();
    }
    render() {
      // console.log(this.props.store)
      return (
        <div>
          <ArticleContainer store={store} />
        </div>
      );
    }
  }
);

export default Articles;
