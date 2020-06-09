import React, { Component } from "react";
// import store from "./DataStore.js";
// import { Observer } from "mobx-react";
// import Axios from "axios";

// const ArticleContainer = observer(
  class ArticleContainer extends Component {
    // populateStore = () => {
    //   Axios.get("http://localhost:3001/articles").then(
    //     (articles) => (store.articles = articles)
    //   );
    // };

    // componentDidMount() {
    //   this.populateStore();
    // }
    render() {
      return this.props.store.articles.length ? <div>{this.props.store.articles[0].url}</div> : null}
    }
  
// );

export default ArticleContainer;
